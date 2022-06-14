<?php

use Illuminate\Support\Facades\Route;


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
//Admin routes
//Route::get('/', function(){return view('login');});
Route::get('/', 'adminController@login');
Route::get('/', 'adminController@logout')->name('logout');;

Route::post('adminLogin', 'adminController@adminLogin')->name('adminLogin');



Route::get('home', 'adminController@home')->name('home');

Route::post('adduser', 'adminController@adduser')->name('adduser');
Route::get('add_members', 'adminController@add_members')->name('add_members');
Route::post('add_members', 'adminController@add_member_db')->name('add_package');
Route::post('edit_members', 'adminController@edit_members')->name('edit_members');
Route::get('see_members', 'adminController@see_members')->name('see_members');

Route::get('plans', 'adminController@plans')->name('plans');
Route::post('addplan', 'adminController@addplan')->name('addplan');
Route::post('editplan', 'adminController@editplan')->name('editplan');

Route::get('users', 'adminController@users')->name('users');
Route::get('trainers', 'adminController@trainers')->name('trainers');
Route::post('addtrain', 'adminController@addtrain')->name('addtrain');
Route::post('edittrain', 'adminController@edittrain')->name('edittrain');


Route::get('delmem/{id}', 'adminController@delmem')->name('delmem');
Route::get('delplan/{id}', 'adminController@delplan')->name('delplan');
Route::get('deltrain/{id}', 'adminController@deltrain')->name('deltrain');