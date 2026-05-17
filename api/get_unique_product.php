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
    p.*,
    m.nombre AS marca,
    c.nombre AS categoria
FROM producto p
JOIN marca m ON p.marca_id = m.id
JOIN categoria c ON p.categoria_id = c.id
WHERE p.id = ?
";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);
$stmt->execute();

$result = $stmt->get_result();
$producto = $result->fetch_assoc();

if (!$producto) {
    echo json_encode(["error" => "Producto no encontrado"]);
    exit;
}

/* imágenes */
$sqlImg = "
SELECT url, alt_text, es_principal
FROM producto_imagen
WHERE producto_id = ?
ORDER BY orden ASC
";

$stmtImg = $conn->prepare($sqlImg);
$stmtImg->bind_param("i", $id);
$stmtImg->execute();

$resultImg = $stmtImg->get_result();

$imagenes = [];

while ($row = $resultImg->fetch_assoc()) {
    $imagenes[] = $row;
}

$producto["imagenes"] = $imagenes;

echo json_encode($producto);
?>