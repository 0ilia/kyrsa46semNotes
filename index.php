<?php
require_once "bd.php";

?>
<!doctype html>
<html >
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="css/index.css">
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
    <h3><a href="signup.php" id="register">Регистрация</a></h3><br>
    <h3><a href="login.php" id="authorization">Авторизация </a></h3>
<?}else{
    echo "Привет,". $_SESSION['login'];
  ?>
        <form action="logout.php" method="post" id="exitForm">
            <input type="submit" value="Выход" name="logout">
        </form>
<?}?>
<script src="js/jquery.min.js"></script>
<script src="js/index.js"></script>
</body>
</html>