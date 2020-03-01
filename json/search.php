<?php


require_once '../php/Database.php';
session_start();

$obj = new stdClass();
$obj -> results = [];

$db = new Database();
$stmt = $db->pdo()->query("SELECT * FROM VIDEOS WHERE TITLE LIKE '%" . $_POST['query'] . "%'");
foreach ($stmt as $row) {
    $obj->results [] = array(
        "type" => $row['TYPE'],
        "name" => $row['TITLE'],
        "author" => $row['AUTHOR'],
        "description" => $row['DESCRIPTION'],
        "year" => $row['YEAR'],
        "id" => $row['ID']
    );
}

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

echo json_encode($obj);