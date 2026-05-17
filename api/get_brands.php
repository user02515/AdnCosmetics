<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include "connection.php";

$sql = "
SELECT
    id,
    nombre,
    descripcion,
    logo_url,
    activo
FROM marca
WHERE activo = 1
ORDER BY nombre ASC
";

$result = $conn->query($sql);

$brands = [];

while ($row = $result->fetch_assoc()) {

    $brands[] = $row;
}

echo json_encode($brands);

$conn->close();

?>