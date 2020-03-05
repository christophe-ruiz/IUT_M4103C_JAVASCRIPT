<?php


require_once '../php/Database.php';
session_start();

$obj = new stdClass();
$obj -> success = false;
$obj -> successMsg = array();
$obj -> errorMsg = array();

$db = new Database();

$author = $_POST['author'];
$description = $_POST['description'];
$title = $_POST['title'];
$type = $_POST['type'];
$year = $_POST['year'];

if (!isset($author) || !isset($description) || !isset($title) || !isset($type) || !isset($year)) {
    $obj->errorMsg[] = "Couldn't process upload, please fill every fields.";
    echo json_encode($obj);
    return;
}
if (!isset($_FILES['video']['name'])) {
    $obj->errorMsg[] = "Couldn't process upload, please select a video file";
    echo json_encode($obj);
    return;
}
if (!isset($_FILES['cover']['name'])) {
    $obj->errorMsg[] = "Couldn't process upload, please select a cover image";
    echo json_encode($obj);
    return;
}

$obj->t = $type;
$fileExt = strtolower(pathinfo(basename($_FILES['video']['name']))['extension']);

$covExt = strtolower(pathinfo(basename($_FILES['cover']['name']))['extension']);

try {
    $stmt = $db
        -> pdo()
        -> prepare("INSERT INTO VIDEOS VALUES (NULL, ?, ?, ?, ?, ?, ? )")
        -> execute([
            $type,
            $title,
            $author,
            $description,
            $year,
            strtolower($fileExt)
        ]);
    $obj -> success = true;
    $obj -> successMsg [] =  $title . " was successfully added to the database.";
} catch (mysqli_sql_exception $e) {
    $obj -> errorMsg[] = $e -> getMessage();
}

$stmt = $db->pdo()->prepare(
    "SELECT MAX(ID) AS ID ".
    "FROM VIDEOS ");
$stmt->execute();

foreach ($stmt as $row) {
    $id = $row['ID'];
    break;
}

$file = '../content/' . strtolower($type) . '/' . $id . '.' . strtolower($fileExt);
$covFile = '../covers/' . strtolower($id) . '.' . strtolower($covExt);

$obj -> covExt = strtolower($fileExt);

if (move_uploaded_file($_FILES['video']['tmp_name'], $file)) {
    $obj->successMsg[] = $title . " was successfully uploaded.";
    $obj -> success = true;
} else {
    $obj->errorMsg[] = $title . " upload has failed.";
    $obj -> success = false;
}

$covExt = strtolower(pathinfo(basename($_FILES['cover']['name']))['extension']);
$covFile = '../covers/' . strtolower($id) . '.' . strtolower($covExt);
$obj -> covExt = strtolower($fileExt);

if (move_uploaded_file($_FILES['cover']['tmp_name'], $covFile)) {
    $obj->successMsg[] = $title . "'s cover was successfully uploaded.";
    $obj -> successImg = true;
} else {
    $obj->errorMsg[] = $title . "'s cover upload has failed.";
    $obj -> successImg = false;
}

echo json_encode($obj);
