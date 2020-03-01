<?php


session_start();

$obj = new stdClass();
$obj -> message = "Please log in before trying to access Netflux.";

if (isset($_SESSION['user'])) {
    $obj -> success = true;
    $obj -> message = "";
    if ($_SESSION['justLogged']) {
        unset($_SESSION['justLogged']);
        $obj -> message = "Welcome " . $_SESSION['user'] . " !";
    }
}

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

echo json_encode($obj);