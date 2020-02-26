<?php


class Database
{
    private static $host = '91.216.107.164';
    private static $db   = 'cruiz1237388';
    private static $user = 'cruiz1237388';
    private static $pass = 'bdni8pqery';
    private static $charset = 'utf8mb4';

    private $pdo;

    public function __construct()
    {
        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ];

        try {
            $this->pdo = new PDO("'mysql:host= " . Database::$host .  ";dbname= " . Database::$db .";charset= ". Database::$charset, Database::$user, Database::$pass, $options);
        } catch (PDOException $e) {
            throw new PDOException($e->getMessage(), (int)$e->getCode());
        }
    }

    public function pdo () {
        return $this->pdo;
    }


}