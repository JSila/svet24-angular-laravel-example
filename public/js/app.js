angular.module('FavoriteArticles', ['ngRoute', 'ngAnimate'])
    .config(function($routeProvider, $locationProvider, $httpProvider) {
        $routeProvider
            .when('/', {
                templateUrl:'/js/views/articles.html', 
                controller:'IndexController',
                controllerAs:'ctrl',
                resolve: {
                    Articles: function(Api) {
                        return Api.getArticles();
                    }
                }
            })
            .when('/favorite-articles', {
                templateUrl:'/js/views/articles.html', 
                controller:'ArticlesController', 
                controllerAs:'ctrl',
                resolve: {
                    FavArticles: function($q, Api) {
                        return Api.getFavoriteArticles();
                    },
                    Articles: function(Api) {
                        return Api.getArticles();
                    }
                }
            })
            .when('/login', {
                templateUrl:'/js/views/login.html', 
                controller:'AuthController', 
                controllerAs:'authCtrl'
            })
            .when('/register', {
                templateUrl:'/js/views/register.html', 
                controller:'AuthController', 
                controllerAs:'authCtrl'
            })
            .otherwise({ redirectTo: '/'});

        $locationProvider.html5Mode(true);
        $httpProvider.interceptors.push('Interceptor');
    })
    .run(function($rootScope, $location) {
        $rootScope.$on("$routeChangeError", function(evt,current,previous,rejection) {
            $location.path('/login');
        })
    })
    .factory('Interceptor', function($q, $location) {
        return {
            responseError: function(rejection) {
                if (rejection.status == 401) {
                    $location.path('/login');
                };
                return $q.reject(rejection); // or $q.when(config);
            },
        };
    })
    .factory('Auth', function($http, $q, $location) {
        var user = null;
        return {
            login: function(credentials) {
                return $http.post('/auth/login', credentials).success(function(data) {
                    user = data;
                });
            },
            logout: function() {
                return $http.get('/auth/logout').success(function(data) {
                    $location.path('/');
                    user = null;
                });
            },
            getUser: function() {
                var defer = $q.defer();

                $http.get('/auth/user')
                    .success(defer.resolve)
                    .error(defer.reject);

                return defer.promise;
            },
            user: function() {
                return user;
            },
            register: function(credentials) {
                return $http.post('/auth/register', credentials).success(function() {
                });
            }
        }
    })
    .factory('Api', function($q, $http) {
        return {
            getArticles: function() {
                var defer = $q.defer();

                $http.get('http://api.kme.si/v1/articles?resource_id=22&limit=20&order=desc')
                    .success(defer.resolve)
                    .error(defer.reject);
                
                return defer.promise;
            },
            getFavoriteArticles: function() {
                var defer = $q.defer();

                $http.get('/articles')
                    .success(defer.resolve)
                    .error(defer.reject);

                return defer.promise;
            },
            postFavoriteArticle: function (article) {
                $http.post('/articles', article).success(function() {
                    console.log('success at posting new favorite article');
                })
            },
            deleteFavoriteArticle: function(article) {
                $http.delete('/articles', {params: article}).success(function() {
                    console.log('success at deleting favorite article');
                })
            }
        };
    })
    .controller('ApplicationController', function(Auth, $scope) {
        var self = this;
        Auth.getUser().then(function(data) {
            self.user = data;
        });

        self.logout = function() {
            Auth.logout().success(function() {
                self.user = null;
            });
        }

        $scope.$on('updateUser', function() {
            self.user = Auth.user();
        })
    })
    .controller('IndexController', function(Articles, Api) {
        this.articles = Articles.data.list;

        this.addFavoriteArticle = function(article) {
            Api.postFavoriteArticle(article);
        }
    })
    .controller('ArticlesController', function(Articles, FavArticles, Api) {
        var self = this;
        this.articles = FavArticles;
        this.allArticles = Articles.data.list;
        this.fiveArticles = this.allArticles.slice(0, 5);
        this.minArticleId = 0;
        this.maxArticleId = 4;

        this.loggedIn = true;

        this.removeFavoriteArticle = function(article) {
            Api.deleteFavoriteArticle(article);
            self.articles = self.articles.filter(function(item) {
                console.log('c');
                return item.id != article.id; 
            });
        }
        this.nextArticle = function () {
            self.maxArticleId++;
            self.minArticleId++;
            self.fiveArticles.push(self.allArticles[self.maxArticleId]);
            self.fiveArticles.shift();
        };

        this.prevArticle = function () {   
            self.maxArticleId--;
            self.minArticleId--;
            self.fiveArticles.pop();
            self.fiveArticles.unshift(self.allArticles[self.minArticleId]);
        };
    })
    .controller('AuthController', function(Auth, $rootScope, $location) {        
        this.login = function(user) {
            Auth.login(user).success(function() {
                $rootScope.$broadcast("updateUser");
                $location.path('/');
            });
        };
        this.register = function(user) {
            Auth.register(user).success(function() {
                $location.path('/login');
            });
        };
    })
    .filter('setImageSize', function() {
        return function(input, size) {
            return input.replace('##WIDTH##', size).replace('##HEIGHT##', size);
        };
    })
    .filter('getLastSection', function() {
        return function(input) {
            return input.split(' / ').pop();
        };
    });
