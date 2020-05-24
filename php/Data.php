<?php



class Data
{
    private $data;

    public function __construct() {
        $this->data = json_decode(file_get_contents('../settings.json'), true);
    }

    public function data() {
        return $this->data;
    }
}