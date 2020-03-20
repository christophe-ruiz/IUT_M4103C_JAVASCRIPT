<?php


require_once '../php/Database.php';
session_start();

$obj = new stdClass();
$obj -> success = false;

$db = new Database();

$stmt = $db->pdo()->prepare("DELETE FROM USR WHERE USERNAME = ?");
$stmt->execute([$_SESSION['user']]);
if ($stmt->rowCount()) {
    $obj -> success = true;
    $_SESSION['deleted'] = "Your account has been successfully deleted !";
} else {
    $obj -> message = "Sorry, unable to delete your account. Please retry in a few minutes.";
}

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

echo json_encode($obj);

