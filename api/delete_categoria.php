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

if (!$id) {
    http_response_code(400);
    echo json_encode(["message" => "ID requerido"]);
    exit;
}

$sql = "
UPDATE categoria
SET activo = 0
WHERE id = ?
";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);

if ($stmt->execute()) {

    echo json_encode([
        "success" => true,
        "message" => "Categoría desactivada correctamente"
    ]);

} else {

    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Error al desactivar categoría"
    ]);

}

$stmt->close();
$conn->close();