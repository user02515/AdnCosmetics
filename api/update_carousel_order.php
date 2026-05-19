<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include "connection.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(["success" => false]);
    exit();
}

foreach ($data as $item) {

    $id = $item["id"];
    $orden = $item["orden"];

    $stmt = $conn->prepare("
        UPDATE carrusel_imagen
        SET orden = ?
        WHERE id = ?
    ");

    $stmt->bind_param("ii", $orden, $id);
    $stmt->execute();
}

echo json_encode([
    "success" => true
]);