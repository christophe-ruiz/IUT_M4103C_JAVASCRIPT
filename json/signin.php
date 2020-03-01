<?php


require_once '../php/Database.php';
session_start();

$obj = new stdClass();
$obj -> success = false;
$obj -> message = "Couldn't log you in, please verify your credentials.";

$db = new Database();
$stmt = $db->pdo()->query("SELECT * FROM USR WHERE USERNAME = '" . $_POST['username'] . "'");
foreach ($stmt as $row) {
    if ($row['PASSWORD'] == $_POST['pwd']) {
        $obj->success = true;
        $obj->message = "Welcome " . $_POST['username'] . " !";
        $_SESSION['user'] = $_POST['username'];
        $_SESSION['justLogged'] = true;
    }
}

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

echo json_encode($obj);