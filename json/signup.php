<?php


require_once '../php/Database.php';
session_start();

$obj = new stdClass();
$obj -> success = false;
$obj -> message = "Couldn't process registration, please retry in a few seconds.";

$db = new Database();

$usr = $_POST['username'];
$pwd = $_POST['pwd'];
$mail = $_POST['mail'];

if (!isset($usr) || !isset($pwd) || !isset($mail) ) {
    echo json_encode($obj);
    return;
}

try {
    $stmt = $db
        -> pdo()
        -> prepare("INSERT INTO USR VALUES (?, ?, ?, NOW(), FALSE)")
        -> execute([
            $usr,
            $pwd,
            $mail
        ]);
    $obj -> success = true;
    $obj -> message = 'Success !';
    $_SESSION['user'] = $usr;
    $_SESSION['justLogged'] = true;
} catch (mysqli_sql_exception $e) {
    $obj -> message = $e -> getMessage();
}

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

echo json_encode($obj);