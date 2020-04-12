<?php
require_once "../bd.php";
require_once "../libs/genSalt.php";

class Aut
{


    public function confirmUser($login, $password)
    {
        $error = array();
        $user = R::findOne('users', 'login = ?', array($login));
        if ($user) {
            if (password_verify($password, $user->password)) {
                $_SESSION['auth'] = true;
                $_SESSION['login'] = $user->login;
                $key = generateSalt();

                setcookie('login', $user->login, time() + 60 * 60 * 24 * 30); //логин
                setcookie('key', $key, time() + 60 * 60 * 24 * 30); //случайная строка
                $user->cookie = $key;
                R::store($user);
              //  header("refresh: 1");
                //header('Location: /');
               // header('Refresh: 4; URL=/');
                echo  "Вы вошли";
            }
            else {
            $error[] = "Логин или пароль не верный";
        }
        } else {
            $error[] = "Логин или пароль не верный";
        }

        if (!empty($error)) {
            echo array_shift($error);
        }
    }

}
$aut = new Aut();
if (isset($_POST['login']) && isset($_POST['password'])) {
    $aut->confirmUser(trim(htmlspecialchars($_POST['login'])), htmlspecialchars($_POST['password']));

}

