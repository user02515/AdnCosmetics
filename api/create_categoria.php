<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// 👇 ESTO ES CRÍTICO
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include "connection.php";

$data = json_decode(file_get_contents("php://input"), true);

$nombre = $data["nombre"] ?? null;
$eslogan = $data["eslogan"] ?? null;
$descripcion = $data["descripcion"] ?? null;

if (!$nombre) {
    http_response_code(400);
    echo json_encode(["message" => "Nombre requerido"]);
    exit;
}

$sql = "
INSERT INTO categoria (nombre, eslogan, descripcion, activo)
VALUES (?, ?, ?, 1)
";

$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $nombre, $eslogan, $descripcion);

if ($stmt->execute()) {

    echo json_encode([
        "success" => true,
        "id" => $stmt->insert_id
    ]);

} else {

    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Error al crear categoría"
    ]);

}

$stmt->close();
$conn->close();
?>