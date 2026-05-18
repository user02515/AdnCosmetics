<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
include "connection.php";

$sql = "
SELECT 
    p.id,
    p.nombre,
    p.slug,
    p.descripcion_corta,
    p.uso,
    p.publico,
    p.precio_minoritario,

    p.marca_id,
    p.categoria_id,

    m.nombre AS marca,
    c.nombre AS categoria,

    (
        SELECT pi.url 
        FROM producto_imagen pi 
        WHERE pi.producto_id = p.id 
        AND pi.es_principal = 1 
        LIMIT 1
    ) AS imagen_principal

FROM producto p

JOIN marca m ON p.marca_id = m.id
JOIN categoria c ON p.categoria_id = c.id

WHERE p.disponible = 1

ORDER BY p.orden ASC, p.id DESC
";

$result = $conn->query($sql);

$productos = [];

while ($row = $result->fetch_assoc()) {
    $productos[] = $row;
}

echo json_encode($productos);
?>