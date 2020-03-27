<?
require_once "libs/rb-mysql.php";
R::setup( 'mysql:host=localhost;dbname=registerbd',
    'root', '' );
session_start();

