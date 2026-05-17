<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include "connection.php";

$id = $_GET["id"] ?? null;

if (!$id) {

    http_response_code(400);

    echo json_encode([
        "message" => "ID requerido"
    ]);

    exit;
}

$sql = "
SELECT
    id,
    nombre,
    descripcion,
    logo_url,
    activo
FROM marca
WHERE id = ?
LIMIT 1
";

$stmt = $conn->prepare($sql);

$stmt->bind_param("i", $id);

$stmt->execute();

$result = $stmt->get_result();

$brand = $result->fetch_assoc();

if (!$brand) {

    http_response_code(404);

    echo json_encode([
        "message" => "Marca no encontrada"
    ]);

    exit;
}

echo json_encode($brand);

$stmt->close();
$conn->close();

?>