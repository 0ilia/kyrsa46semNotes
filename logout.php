<?php
session_start();
$_SESSION = array();
setcookie('key', null, -1, '/');
setcookie('login', null, -1, '/');
session_destroy();
header('Location: /');