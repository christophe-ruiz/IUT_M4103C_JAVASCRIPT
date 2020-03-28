<?php


require_once '../php/Database.php';
session_start();

$obj = new stdClass();
$obj -> success = false;

$db = new Database();

$who = $_GET['who'] == 'me' ? $_SESSION['user'] : $_GET['who'];
$obj -> who = $who;

$stmt = $db->pdo()->prepare("DELETE FROM USR WHERE USERNAME = ?");
$stmt->execute([$who]);
if ($stmt->rowCount()) {
    $stmt = $db->pdo()->prepare("SELECT * FROM NOTES WHERE USR = ?");
    $stmt->execute([$who]);
    if ($stmt->rowCount()) {
        $stmt = $db->pdo()->prepare("DELETE FROM NOTES WHERE USR = ?");
        $stmt->execute([$who]);
        if ($stmt->rowCount() && $_GET['who'] != 'me') {
            $obj -> success = true;
            $obj -> message = $_GET['who'] . "'s account has been successfully deleted !";
        } else if ($stmt->rowCount()) {
            $obj -> success = true;
            $_SESSION['deleted'] = "Your account has been successfully deleted !";
        } else {
            $obj -> message = "Sorry, unable to delete " . ($_GET['who'] == 'me' ? 'your' : ($_GET['who'] . "'s")) . " account. Please retry in a few minutes.";
        }
    } else {
        $obj -> success = true;
        $obj -> message = $_GET['who'] . "'s account has been successfully deleted !";
        if (!$_SESSION['admin']) {
            $_SESSION['deleted'] = ($_GET['who'] == 'me' ? "Your" : ($_GET['who'] . "'s")) . " account has been successfully deleted !";
        }
    }
} else {
    $obj -> message = "Sorry, unable to delete " . ($_GET['who'] == 'me' ? 'your' : ($_GET['who'] . "'s")) . " account. Please retry in a few minutes.";
}

unset($_GET);

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

echo json_encode($obj);

