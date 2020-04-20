<?php


require_once 'Data.php';
class Database
{
    private $pdo;

    public function __construct() {
        $data = new Data();
        $data = $data->data()['db'];

        $host = $data['server'];
        $db = $data['name'];
        $charset = $data['charset'];
        $user = $data['username'];
        $pass = $data['password'];

        $dsn = 'mysql:host='. $host . ';dbname='. $db . ';charset='. $charset;
        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ];

        try {
            $this->pdo = new PDO($dsn, $user, $pass, $options);
        } catch (PDOException $e) {
            throw new PDOException($e->getMessage(), (int)$e->getCode());
        }
    }

    public function pdo () {
        return $this->pdo;
    }
}
