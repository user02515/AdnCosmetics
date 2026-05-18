<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include "connection.php";

// recibir id
$id = $_POST["id"] ?? null;

if (!$id) {
    http_response_code(400);
    echo json_encode(["message" => "ID requerido"]);
    exit;
}

// 1. obtener imagen antes de borrar
$sql = "SELECT logo_url FROM marca WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();
$data = $result->fetch_assoc();

if (!$data) {
    http_response_code(404);
    echo json_encode(["message" => "Marca no encontrada"]);
    exit;
}

$logo_url = $data["logo_url"];

// 2. borrar registro en BD
$sql = "
UPDATE marca
SET activo = 0
WHERE id = ?
";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);

if ($stmt->execute()) {

    echo json_encode([
        "success" => true,
        "message" => "Marca eliminada correctamente"
    ]);

} else {
    http_response_code(500);
    echo json_encode(["message" => "Error al eliminar"]);
}

$stmt->close();
$conn->close();

?>