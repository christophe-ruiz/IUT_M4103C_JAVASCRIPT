<?php


require_once '../php/Database.php';
session_start();

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

$obj = new stdClass();
$obj -> success = false;
$obj -> message[] = "Couldn't retrieve the list of the most recent uploads. Sorry for the inconvenience.";

$db = new Database();

try {
    $stmt = $db
        -> pdo()
        -> prepare("SELECT * FROM VIDEOS ORDER BY ID DESC LIMIT 5");
    $stmt-> execute();
    $obj -> success = true;
} catch (Exception $e) {
    $obj -> message[] = $e -> getMessage();
}

foreach ($stmt as $row) {
    $obj->results [] = array(
        "type" => $row['TYPE'],
        "name" => $row['TITLE'],
        "author" => $row['AUTHOR'],
        "description" => $row['DESCRIPTION'],
        "year" => $row['YEAR'],
        "id" => $row['ID'],
        "ext" => $row['EXTENSION'],
        "covExt" => $row['COVEXT'],
    );
}

echo json_encode($obj);