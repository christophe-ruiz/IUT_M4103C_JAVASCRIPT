<?php


require_once '../php/Database.php';
session_start();

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

$obj = new stdClass();
$obj -> successMsg = array();
$obj -> errorMsg = array();

$db = new Database();

$title = $_POST['title'];
$author = $_POST['author'];
$description = $_POST['description'];
$year = $_POST['year'];
$type = $_POST['type'];

if (!$_SESSION['admin']) {
    $obj -> unauthorized = "You do not have the required administration level to perform this action. This will be reported.";

    $title = $_POST['title'];
    $author = $_POST['author'];
    $description = $_POST['description'];
    $year = $_POST['year'];
    $type = $_POST['type'];

    $headers = array(
        'From' => 'netflux@cruiz.fr',
        'Reply-To' => 'netflux@cruiz.fr'
    );

    $message = "User " . $_SESSION['user'] . " attempted to access admin panel and sent a form with these informations :\n
Title : " . $title . "\nAuthor = $author" . "\nDescription = $description" . "\nYear = $year" . "\nType = $type";

    mail("chrisrz@free.fr", 'Unauthorized attempt', $message, $headers);

    echo json_encode($obj);
    exit();
}

if (!isset($author) || !isset($description) || !isset($title) || $year == 0) {
    $obj->errorMsg[] = "Couldn't process upload, please fill every fields.";
    echo json_encode($obj);
    exit();
}
if (!isset($_FILES['video']['name'])) {
    $obj->errorMsg[] = "Couldn't process upload, please select a video file";
    echo json_encode($obj);
    exit();
}
if (!isset($_FILES['cover']['name'])) {
    $obj->errorMsg[] = "Couldn't process upload, please select a cover image";
    echo json_encode($obj);
    exit();
}

// récuperer l'extension de la video et de la photo
$fileExt = strtolower(pathinfo(basename($_FILES['video']['name']))['extension']);
$covExt = strtolower(pathinfo(basename($_FILES['cover']['name']))['extension']);

if ($fileExt == 'avi') {
    $obj->errorMsg[] = "Couldn't process upload, .avi is not supported";
    echo json_encode($obj);
    exit();
}

$obj -> fileExt = $fileExt;
$obj -> covExt = $covExt;

//ajouter dans la bd
try {
    $stmt = $db
        -> pdo()
        -> prepare("INSERT INTO VIDEOS VALUES (NULL, ?, ?, ?, ?, ?, ?, ? )")
        -> execute([
            $type,
            $title,
            $author,
            $description,
            $year,
            $fileExt,
            $covExt
        ]);
    $obj -> successMsg [] =  $title . " was successfully added to the database.";
} catch (mysqli_sql_exception $e) {
    $obj -> errorMsg[] = $e -> getMessage();
}

//récupérer l'id du dernier element ajouté dans la bd
$stmt = $db->pdo()->prepare(
    "SELECT MAX(ID) AS ID ".
    "FROM VIDEOS ");
$stmt->execute();

foreach ($stmt as $row) {
    $id = $row['ID'];
    $obj -> maxID = $id;
    break;
}

//créer le chemin de destination
$file = '../content/' . strtolower($type) . '/' . $id . '.' . strtolower($fileExt);
$covFile = '../covers/' . strtolower($id) . '.' . strtolower($covExt);

$obj -> fileDir = $file;
$obj -> covDir = $covFile;

//envoi de video
if (move_uploaded_file($_FILES['video']['tmp_name'], $file)) {
    $obj->successMsg[] = $title . " was successfully uploaded.";
} else {
    $obj->errorMsg[] = $title . " upload has failed.";
}

// envoi d'image
if (move_uploaded_file($_FILES['cover']['tmp_name'], $covFile)) {
    $obj->successMsg[] = $title . "'s cover was successfully uploaded.";
} else {
    $obj->errorMsg[] = $title . "'s cover upload has failed.";
}

echo json_encode($obj);
