<?php

header("Content-Type: application/json");

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

include "connection.php";

$id         = $_POST['id'] ?? null;
$titulo     = trim($_POST['titulo'] ?? '');
$subtitulo  = trim($_POST['subtitulo'] ?? '');
$orden      = $_POST['orden'] ?? 0;

if (!$id) {
    http_response_code(400);
    echo json_encode([
        "message" => "ID requerido"
    ]);
    exit;
}

$sql = "
UPDATE carrusel_imagen
SET
    titulo = ?,
    subtitulo = ?,
    orden = ?
WHERE id = ?
";

$stmt = $conn->prepare($sql);

$stmt->bind_param(
    "ssii",
    $titulo,
    $subtitulo,
    $orden,
    $id
);

if ($stmt->execute()) {

    echo json_encode([
        "success" => true,
        "message" => "Slide actualizado correctamente"
    ]);

} else {

    http_response_code(500);

    echo json_encode([
        "message" => "Error al actualizar slide"
    ]);
}
?>