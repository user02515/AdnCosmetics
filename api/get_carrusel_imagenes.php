<?php
header("Content-Type: application/json");
include "connection.php";

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
WHERE activo = 1
ORDER BY orden ASC, id ASC
";

$result = $conn->query($sql);

$slides = [];

while ($row = $result->fetch_assoc()) {
    $slides[] = $row;
}

echo json_encode($slides);
?>