<?
require_once "bd.php";

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
            $user->password = password_hash(htmlspecialchars($password), PASSWORD_DEFAULT);
            $user->cookie = $this->generateSalt();

            R::store($user);

            $_SESSION['auth'] = true;
            $_SESSION['login'] = $user->login;
            $key = $user->cookie;

            setcookie('login', $user->login, time() + 60 * 60 * 24 * 30);
            setcookie('key', $key, time() + 60 * 60 * 24 * 30);
            header('Location: /');
        } else {
            Errors:
            echo array_shift($errors);
        }
    }
}

$register = new Reg();
if (isset($_POST['input_reg'])) {

    $register->addUser($_POST["login"], $_POST["email"], $_POST['password'], $_POST['password2']);
}


?>

<form action="/signup.php" method="post">
    <label for="login">Логин:</label><br>
    <input name="login" id="login" value="<?= $_POST['login']; ?>" type="text"><br>

    <label for="email">Ваш E-Mail:</label><br>
    <input name="email" id="email" value="<?= $_POST['email']; ?>" type="email"><br>
    <label for="password">Пароль:</label><br>
    <input name="password" type="password" value="<?= $_POST['password']; ?>" id="password"><br>
    <label for="confirm_password">Повторите пароль:</label><br>
    <input name="password2" value="<?= $_POST['password2']; ?>" type="password" id="confirm_password"><br> <br>
    <input name="input_reg" type="submit">
    <a href="/"><-Назад</a>
</form>
