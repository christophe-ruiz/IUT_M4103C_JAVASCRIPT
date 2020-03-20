<?php


class Database
{
    private $host = '91.216.107.164';
    private $db   = 'cruiz1237388';
    private $user = 'cruiz1237388';
    private $pass = 'bdni8pqery';
    private $charset = 'utf8mb4';

    private $pdo;
    public function __construct() {
        $dsn = 'mysql:host='. $this->host . ';dbname='. $this->db . ';charset='. $this->charset;
        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ];

        try {
            $this->pdo = new PDO($dsn, $this->user, $this->pass, $options);
        } catch (PDOException $e) {
            throw new PDOException($e->getMessage(), (int)$e->getCode());
        }
    }

    public function pdo () {
        return $this->pdo;
    }


}