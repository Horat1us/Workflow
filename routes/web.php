<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('{slug}', function () {
    return view('welcome');
})

    ->where('slug', '(?!api)([A-z\d-\/_.]+)?');


Route::get('/api/state', 'Auth\LoginController@state');
Route::post('/api/login', 'Auth\LoginController@login');
Route::post('/api/logout', 'Auth\LoginController@logout');