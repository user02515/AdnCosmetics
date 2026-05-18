<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
include "connection.php";

$sql = "
SELECT 
    numero_whatsapp,
    mensaje_whatsapp_plantilla,
    logo_url,
    color_primario,
    meta_descripcion
FROM configuracion_tienda
ORDER BY id DESC
LIMIT 1
";

$result = $conn->query($sql);

if ($result->num_rows === 0) {
    echo json_encode([
        "error" => "No hay configuración registrada"
    ]);
    exit;
}

$config = $result->fetch_assoc();

echo json_encode($config);

$conn->close();
?>