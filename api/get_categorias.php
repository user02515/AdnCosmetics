<?php
header("Content-Type: application/json");
include "connection.php";

$sql = "
SELECT 
    id,
    nombre,
    eslogan,
    descripcion,
    imagen_url,
    slug
FROM categoria
WHERE activo = 1
ORDER BY id ASC
";

$result = $conn->query($sql);

$categorias = [];

while ($row = $result->fetch_assoc()) {
    $categorias[] = $row;
}

echo json_encode($categorias);
?>