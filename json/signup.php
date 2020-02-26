<?php
    require_once '../php/Database.php';
    session_start();

    $obj = new stdClass();
    $obj -> success = false;
    $obj -> message = '';

    $db = new Database();

    try {
        $stmt = $db
            ->pdo()
            ->prepare("INSERT INTO USR VALUES (" . $_POST['username'] . ', ' . $_POST['pwd'] . ", NOW(), FALSE)")
            ->execute();
        $obj->success = true;
    } catch (mysqli_sql_exception $e) {
        $e->getMessage();
    }

    header('Cache-Control: no-cache, must-revalidate');
    header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
    header('Content-type: application/json');

    echo json_encode($obj);