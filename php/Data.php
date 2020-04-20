<?php



class Data
{
    private $data;

    public function __construct() {
        $this->data = json_decode('../settings.json');
    }

    public function data() {
        return $this->data;
    }
}