<?php


require_once '../php/Database.php';
session_start();

$obj = new stdClass();
$obj -> results = [];
$obj -> found = 0;

$db = new Database();
$stmt = $db->pdo()->query("SELECT * FROM VIDEOS WHERE TITLE LIKE '%" . $_POST['q'] . "%'");
foreach ($stmt as $row) {
    $obj->results [] = array(
        "type" => $row['TYPE'],
        "name" => $row['TITLE'],
        "author" => $row['AUTHOR'],
        "description" => $row['DESCRIPTION'],
        "year" => $row['YEAR'],
        "id" => $row['ID']
    );
    $obj->found = ++$obj->found;
}

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

echo json_encode($obj);