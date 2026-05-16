<?php

$host = "localhost";
$user = "u881296436_vdncosmetics";
$password = "N3veroddorev3N";
$database = "u881296436_bdVDNCosmetics";

$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    die("Error de conexion: " . $conn->connect_error);
}

$conn->set_charset("utf8");
?>