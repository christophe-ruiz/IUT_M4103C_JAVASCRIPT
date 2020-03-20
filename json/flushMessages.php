<?php


session_start();

$obj = new stdClass();
$obj -> session = $_SESSION;
$obj -> deleted = $_SESSION['deleted'];
$obj -> disconnected = $_SESSION['disconnected'];

if (isset($_SESSION['deleted']) || isset($_SESSION['disconnected'])) {
    // Détruit toutes les variables de session
    $_SESSION = array();

    // Si vous voulez détruire complètement la session, effacez également
    // le cookie de session.
    // Note : cela détruira la session et pas seulement les données de session !
    if (ini_get("session.use_cookies")) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000,
            $params["path"], $params["domain"],
            $params["secure"], $params["httponly"]
        );
    }

    // Finalement, on détruit la session.
    session_destroy();
}

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

echo json_encode($obj);