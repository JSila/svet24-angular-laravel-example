<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/


Route::controllers([
    'auth' => 'Auth\AuthController',
    'password' => 'Auth\PasswordController',
]);

get('/articles', 'ArticlesController@index');
post('/articles', 'ArticlesController@store');
delete('/articles', 'ArticlesController@destroy');

get('{all}', 'PagesController@index')->where('all', '.*');
