<?php
header("Content-Type: application/json");
include "connection.php";

$id = $_GET['id'] ?? null;

if (!$id) {
    echo json_encode(["error" => "ID requerido"]);
    exit;
}

$sql = "
SELECT 
    id,
    titulo,
    subtitulo,
    imagen_url,
    enlace,
    orden,
    activo
FROM CARRUSEL_IMAGEN
WHERE id = ?
";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);
$stmt->execute();

$result = $stmt->get_result();
$slide = $result->fetch_assoc();

if (!$slide) {
    echo json_encode(["error" => "Imagen no encontrada"]);
    exit;
}

echo json_encode($slide);
?>