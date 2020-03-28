<?php
require_once "../bd.php";

class Aut
{
    function generateSalt()
    {
        $salt = '';
        for ($i = 0; $i < 13; $i++) {
            $salt .= chr(mt_rand(33, 126)); //символ из ASCII-table
        }
        return $salt;
    }

    public function confirmUser($login, $password)
    {
        $error = array();
        $user = R::findOne('users', 'login = ?', array($login));
        if ($user) {
            if (password_verify($password, $user->password)) {
                $_SESSION['auth'] = true;
                $_SESSION['login'] = $user->login;
                $key = $this->generateSalt();

                setcookie('login', $user->login, time() + 60 * 60 * 24 * 30); //логин
                setcookie('key', $key, time() + 60 * 60 * 24 * 30); //случайная строка
                $user->cookie = $key;
                R::store($user);
              //  header("refresh: 1");
                //header('Location: /');
               // header('Refresh: 4; URL=/');

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
    echo  "Вы вошли";

}

