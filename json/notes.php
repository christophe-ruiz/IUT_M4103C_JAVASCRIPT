<?php


require_once '../php/Database.php';

$obj = new stdClass();
$obj -> note = 0;

$db = new Database();

$stmt = $db->pdo()->prepare("SELECT AVG(NOTE) AS MOY FROM NOTES WHERE IDV = ?");
$stmt->execute([$_GET['IDV']]);

$obj -> note = number_format($stmt->fetch()['MOY'], 2);

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

echo json_encode($obj);

