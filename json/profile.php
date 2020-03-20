<?php


require_once '../php/Database.php';
session_start();

if (!isset($_SESSION['profile'])) {
    $_SESSION['profile'] = true;
}
$_SESSION['profile'] = !$_SESSION['profile'];

$obj = new stdClass();
$obj -> profile = $_SESSION['profile'];

$db = new Database();

$stmt = $db->pdo()->prepare("SELECT * FROM USR WHERE USERNAME = ?");
$stmt->execute([$_SESSION['user']]);

foreach ($stmt as $row) {
    $obj -> username = $row['USERNAME'];
    $obj -> date =
        substr($row['SIGN_UP_DATE'], -2) . '/' .
        substr($row['SIGN_UP_DATE'], 5, 2) . '/' .
        substr($row['SIGN_UP_DATE'], 0, 4);
    $obj -> isAdmin = $row['IS_ADMIN'];
    $obj -> admin = $obj -> isAdmin ? 'admin' : 'user';
}

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

echo json_encode($obj);