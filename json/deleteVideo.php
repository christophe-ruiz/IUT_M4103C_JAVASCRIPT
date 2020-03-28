<?php


require_once '../php/Database.php';
session_start();

$obj = new stdClass();
$obj -> success = false;

$db = new Database();

$stmt = $db->pdo()->prepare("SELECT TYPE, EXTENSION, COVEXT FROM VIDEOS WHERE ID = ?");
$stmt->execute([$_GET['which']]);

$vid = $stmt->fetch();
$ext = $vid['EXTENSION'];
$type = strtolower($vid['TYPE']);
$covext = $vid['COVEXT'];

$vid = '../content/' . $type . '/' . $_GET['which'] . '.' . $ext;
$cov = '../covers/' . $_GET['which'] . '.' . $covext;

$obj -> controlVid = $vid;
$obj -> controlCov = $cov;

$db -> pdo() -> beginTransaction();

$stmt = $db->pdo()->prepare("DELETE FROM VIDEOS WHERE ID = ?");
$stmt->execute([$_GET['which']]);

if ($stmt->rowCount()) {
    $stmt = $db->pdo()->prepare("SELECT * FROM NOTES WHERE IDV = ?");
    $stmt->execute([$_GET['which']]);
    if ($stmt->rowCount()) {
        $stmt = $db->pdo()->prepare("DELETE FROM NOTES WHERE IDV = ?");
        $stmt->execute([$_GET['which']]);
        if ($stmt->rowCount() && file_exists($vid) && file_exists($cov)) {
            unlink($vid);
            unlink($cov);
            $obj -> success = true;
            $obj -> msg = "Video successfully deleted !";
            $db -> pdo() -> commit();
        } else {
            $db -> pdo() -> rollBack();
            $obj -> msg = "Sorry, unable to delete the video.";
        }
    } else if (file_exists($vid) && file_exists($cov)) {
        unlink($vid);
        unlink($cov);
        $obj -> success = true;
        $obj -> msg = "Video successfully deleted !";
        $db -> pdo() -> commit();
    } else {
        $db -> pdo() -> rollBack();
        $obj -> msg = "Sorry, unable to delete the video.";
    }
} else {
    $db -> pdo() -> rollBack();
    $obj -> msg = "Sorry, unable to delete the video. Try again after you log back in.";
}

$obj -> get = $_GET;

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

echo json_encode($obj);

