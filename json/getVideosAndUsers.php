<?php


require_once '../php/Database.php';
session_start();

$obj = new stdClass();

$db = new Database();

$stmt = $db->pdo()->prepare("SELECT USERNAME, SIGN_UP_DATE FROM USR WHERE USERNAME != ?");
$stmt->execute([$_SESSION['user']]);

foreach ($stmt as $row) {
    $obj -> users[] = array(
        "name" => $row['USERNAME'],
        "date" =>
            substr($row['SIGN_UP_DATE'], -2) . '/' .
            substr($row['SIGN_UP_DATE'], 5, 2) . '/' .
            substr($row['SIGN_UP_DATE'], 0, 4)
    );
}

$stmt = $db->pdo()->query("SELECT ID, TITLE FROM VIDEOS");
foreach ($stmt as $row) {
    $stmt = $db->pdo()->prepare("SELECT AVG(NOTE) AS RATE FROM NOTES WHERE IDV = ?");
    $stmt -> execute([$row['ID']]);
    $rate = $stmt->fetch()['RATE'];
    $obj -> videos[] = array(
        "title" => $row['TITLE'],
        "id" => $row['ID'],
        "ratings" => number_format($rate, 2)
    );
}

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

echo json_encode($obj);