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
    -> prepare("SELECT * FROM VIDEOS WHERE THREAD_FATHER = ? AND TYPE = 'SHOW' ORDER BY TITLE ASC ");
$stmt-> execute([
    $_GET['which']
]);

if ($stmt->rowCount()) {
    $stmt = $db
        -> pdo()
        -> prepare("SELECT * FROM VIDEOS WHERE (THREAD_FATHER = ? OR ID = ?) AND TYPE = 'SHOW' ORDER BY TITLE ASC ");
    $stmt-> execute([
        $_GET['which'],
        $_GET['which']
    ]);
} else {
    $stmt = $db
        -> pdo()
        -> prepare("SELECT * FROM VIDEOS WHERE ID = ?");
    $stmt-> execute([
        $_GET['which']
    ]);
    $father = null;
    foreach ($stmt as $row) {
        $father = $row['THREAD_FATHER'];
    }
    $stmt = $db
        -> pdo()
        -> prepare("SELECT * FROM VIDEOS WHERE (THREAD_FATHER = ? OR ID = ?) AND TYPE = 'SHOW' ORDER BY TITLE ASC ");
    $stmt-> execute([
        $father,
        $father
    ]);
}

foreach ($stmt as $row) {
    $obj->thread [] = array(
        "type" => $row['TYPE'],
        "name" => $row['TITLE'],
        "author" => $row['AUTHOR'],
        "description" => $row['DESCRIPTION'],
        "year" => $row['YEAR'],
        "id" => $row['ID'],
        "ext" => $row['EXTENSION'],
        "covExt" => $row['COVEXT'],
        "father" => $row["THREAD_FATHER"]
    );
}

echo json_encode($obj);