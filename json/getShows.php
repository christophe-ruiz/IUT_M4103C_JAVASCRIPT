<?php


require_once '../php/Database.php';
session_start();

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

$obj = new stdClass();

$db = new Database();

$stmt = $db
    -> pdo()
    -> query("SELECT * FROM VIDEOS WHERE THREAD_FATHER IS NULL AND TYPE = 'SHOW' ORDER BY TITLE DESC");
$stmt = $stmt->fetchAll();

foreach ($stmt as $row) {
    $obj->shows [] = array(
        "title" => $row['TITLE'],
        "id" => $row['ID'],
    );
}

echo json_encode($obj);