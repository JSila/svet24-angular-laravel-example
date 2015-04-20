<!doctype html>
<html lang="en" ng-app="FavoriteArticles">
<head>
    <meta charset="UTF-8">
    <title>'My favorite articles' project</title>
    <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css">
    <link rel="stylesheet" href="/css/main.css">
    <base href="/">
</head>
<body ng-controller="ApplicationController as appCtrl">

<div class="container">
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="/">Priljubljeni članki</a>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav">
            <li><a href="/favorite-articles">Članki</a></li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li><a ng-hide="appCtrl.user" href="/login">Prijavi se</a></li>
            <li><a ng-show="appCtrl.user" ng-click="appCtrl.logout()">Dobrodošel nazaj, <strong>{{ appCtrl.user.name }}</strong>! Odjavi se</a></li>
          </ul>
        </div><!-- /.navbar-collapse -->
      </div><!-- /.container-fluid -->
    </nav>
</div>

    <div class="container" ng-view>
        
    </div>

    <script src="//code.angularjs.org/1.3.15/angular.js"></script>
    <script src="//code.angularjs.org/1.3.15/angular-route.js"></script>
    <script src="//code.angularjs.org/1.3.15/angular-animate.js"></script>
    <script src="/js/app.js"></script>
</body>
</html>
