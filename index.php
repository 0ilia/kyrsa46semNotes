<?php
require_once "bd.php";

?>
<!doctype html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width,index user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="css/index.css">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>

<?
if (empty($_SESSION['auth'])) {
    if ((!empty($_COOKIE['login'])) && (!empty($_COOKIE['key']))) {

        $login = $_COOKIE['login'];
        $key = $_COOKIE['key']; //ключ из кук (аналог пароля, в базе поле cookie)
        $user = R::findOne('users', 'login = ?', array($login));


        if ($user->cookie == $key) {
            $_SESSION['auth'] = true;
            $_SESSION['login'] = $user->login;
        }

    }
}
if ((!isset($_SESSION['a'])) && (!isset($_SESSION['login']))) { ?>

    <div id="wrapper">
        <div id="myAut">
            <form id="signin" method="post" action="/login.php" autocomplete="off">
                <input type="text" id="login" name="login" placeholder="username"/>
                <input type="password" id="password" name="password" placeholder="password"/>
                <button name="inputAut" type="submit">&#xf0da;</button>
                <p class="register"><a class="openRegForm" href="#">Регистрация</a></p>
            </form>
        </div>

        <div id="myReg">
            <form id="signin" action="/signup.php" method="post" autocomplete="off">
                <input name="login" id="login" value="<?= $_POST['login']; ?>" type="text" placeholder="username">
                <input name="email" id="email" value="<?= $_POST['email']; ?>" type="text" placeholder="email">
                <input name="password" type="password" value="<?= $_POST['password']; ?>" id="password"
                       placeholder="password">
                <input name="password2" value="<?= $_POST['password2']; ?>" type="password" id="confirm_password"
                       placeholder="confirm password">
                <button name="input_reg" type="submit">&#xf0da;</button>
                <p class="auth"><a class="openAuthForm" href="#">Войти</a></p>
            </form>
        </div>
    </div>
    <!-- <h3><a href="login.php" id="authorization">Авторизация </a></h3>-->
<? } else {
    echo "Привет," . $_SESSION['login'];
    ?>
    <form action="logout.php" method="post" id="exitForm">
        <input type="submit" value="Выход" name="logout">
    </form>
<? } ?>
<script src="js/jquery.min.js"></script>
<script src="js/index.js"></script>
</body>
</html>

