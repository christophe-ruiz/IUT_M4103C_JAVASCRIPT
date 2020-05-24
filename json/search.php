<?php


require_once '../php/Database.php';
session_start();


$obj = new stdClass();
$obj -> results = [];
$obj -> found = 0;

if (empty($_GET['q'])) {
    $obj -> message = "Try looking for something that might actually exist.";

    header('Cache-Control: no-cache, must-revalidate');
    header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
    header('Content-type: application/json');

    echo json_encode($obj);
    return;
}

$db = new Database();

$stmt = $db->pdo()->prepare("SELECT * FROM VIDEOS WHERE TITLE LIKE ?");
$stmt->execute(["%".$_GET['q']."%"]);

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
    if (end($obj->results)['type'] == "SHOW") {
        end($obj->results)["thread"] = $row["THREAD_FATHER"];
    }
    ++$obj->found;
}

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

echo json_encode($obj);