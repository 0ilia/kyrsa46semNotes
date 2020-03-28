<?
require_once "../bd.php";

class Reg
{

    function generateSalt()
    {
        $salt = '';
        for ($i = 0; $i < 13; $i++) {
            $salt .= chr(mt_rand(33, 126));
        }
        return $salt;
    }

    public function addUser($login, $email, $password, $password2)
    {
        $errors = array();

        if (trim($login) == '') {
            $errors[] = 'Введите логин';
            goto Errors;
        }
        if (R::count('users', 'login=?', array($login)) > 0) {
            $errors[] = 'Логин уже существует';
            goto Errors;
        }
        if (!filter_var(trim(htmlentities($email)), FILTER_VALIDATE_EMAIL)) {
            $errors[] = "Введите корректный E-mail";
            goto Errors;
        }
        if (R::count('users', 'email=?', array($email)) > 0) {
            $errors[] = 'E-mail уже существует';
            goto Errors;
        }
        if ($password == '') {
            $errors[] = 'Введите пароль';
            goto Errors;
        }
        if ($password != $password2) {
            $errors[] = 'Пароли не совпадают';
            goto Errors;
        }

        if (empty($errors)) {
            $user = R::dispense('users');
            $user->login = trim(htmlentities($_POST["login"]));
            $user->email = trim(htmlentities($_POST["email"]));
            $user->password = password_hash(htmlspecialchars($password), PASSWORD_BCRYPT);
            $user->cookie = $this->generateSalt();

            R::store($user);

            $_SESSION['auth'] = true;
            $_SESSION['auth'] = true;
            $_SESSION['login'] = $user->login;
            $key = $user->cookie;

            setcookie('login', $user->login, time() + 60 * 60 * 24 * 30);
            setcookie('key', $key, time() + 60 * 60 * 24 * 30);
            //     header('Location:  /');
            echo "Вы зарегистрированы";

        } else {
            Errors:
            echo array_shift($errors);
        }
    }
}

$register = new Reg();
if (isset($_POST["login"]) && isset($_POST["email"]) && isset($_POST['password']) && isset($_POST['password2'])) {

    $register->addUser($_POST["login"], $_POST["email"], $_POST['password'], $_POST['password2']);
}


