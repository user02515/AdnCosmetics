<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include "connection.php";

$data = json_decode(file_get_contents("php://input"), true);

$id = $data["id"] ?? null;
$nombre = $data["nombre"] ?? null;
$eslogan = $data["eslogan"] ?? null;
$descripcion = $data["descripcion"] ?? null;

if (!$id || !$nombre) {
    http_response_code(400);
    echo json_encode(["message" => "ID y nombre requeridos"]);
    exit;
}

$sql = "
UPDATE categoria
SET nombre = ?, eslogan = ?, descripcion = ?
WHERE id = ?
";

$stmt = $conn->prepare($sql);
$stmt->bind_param("sssi", $nombre, $eslogan, $descripcion, $id);

if ($stmt->execute()) {

    echo json_encode([
        "success" => true,
        "message" => "Categoría actualizada correctamente"
    ]);

} else {

    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Error al actualizar categoría"
    ]);
}

$stmt->close();
$conn->close();
?>