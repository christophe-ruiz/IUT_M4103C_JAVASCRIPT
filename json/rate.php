<?php


require_once '../php/Database.php';
session_start();
$db = new Database();


$obj = new stdClass();
$obj -> success = false;
$obj -> msg = "Problem encountered when sending your note. Please retry in a few minutes";

$stmt =
    $db
        ->pdo()
        ->query("SELECT * FROM NOTES WHERE IDV = " . $_GET['video'] . " AND USR = '" . $_SESSION['user'] . "'")
        ->fetch();
if ($stmt) {
    $rate = $stmt['NOTE'];
    $obj -> msg = "You've already rated this video with " . $rate . "/5.";
} else {
    try {
        $stmt = $db->pdo()->prepare("INSERT INTO NOTES VALUES (?, ?, ?)");
        $stmt->execute([
            $_GET['video'],
            $_SESSION['user'],
            $_GET['rate'] > 5 ? 5 : ($_GET['rate'] < 0 ? 0 : $_GET['rate'])
        ]);
        $obj -> success = true;
        $obj -> msg = "Your note has been sent !";
    } catch (mysqli_sql_exception $e ) {
        $obj -> msg = $e -> getMessage();
    }
}

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

echo json_encode($obj);