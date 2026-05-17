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
    nombre,
    eslogan,
    descripcion,
    imagen_url,
    slug,
    activo
FROM categoria
WHERE id = ?
";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);
$stmt->execute();

$result = $stmt->get_result();
$categoria = $result->fetch_assoc();

if (!$categoria) {
    echo json_encode(["error" => "Categoria no encontrada"]);
    exit;
}

echo json_encode($categoria);
?>