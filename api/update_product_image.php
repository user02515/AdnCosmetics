<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

/* 🔥 CORS preflight */
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

include "connection.php";

/* 🔥 DATOS */
$producto_id = $_POST["producto_id"] ?? null;
$alt_text = $_POST["alt_text"] ?? "";
$es_principal = $_POST["es_principal"] ?? 1;
$orden = $_POST["orden"] ?? 1;

/* 🔥 VALIDACIÓN */
if (!$producto_id || !isset($_FILES["image"])) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Faltan datos o imagen"
    ]);
    exit;
}

/* 🔥 CARPETA DE SUBIDA */
$uploadDir = "../uploads/productos/";

/* crear carpeta si no existe */
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

/* 🔥 GENERAR NOMBRE ÚNICO */
$fileName = time() . "_" . basename($_FILES["image"]["name"]);
$targetFile = $uploadDir . $fileName;

/* 🔥 SUBIR ARCHIVO */
if (!move_uploaded_file($_FILES["image"]["tmp_name"], $targetFile)) {

    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Error al subir la imagen"
    ]);
    exit;
}

/* 🔥 URL PARA BD */
$url = "/uploads/productos/" . $fileName;

/* 🔥 (OPCIONAL PERO RECOMENDADO)
   borrar imagen anterior principal */
$conn->query("
    DELETE FROM producto_imagen 
    WHERE producto_id = $producto_id AND es_principal = 1
");

/* 🔥 INSERT NUEVA IMAGEN */
$sql = "INSERT INTO producto_imagen 
(producto_id, url, alt_text, es_principal, orden)
VALUES (?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);

if (!$stmt) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => $conn->error
    ]);
    exit;
}

$stmt->bind_param(
    "issii",
    $producto_id,
    $url,
    $alt_text,
    $es_principal,
    $orden
);

/* 🔥 EJECUCIÓN */
if ($stmt->execute()) {

    echo json_encode([
        "success" => true,
        "message" => "Imagen actualizada correctamente",
        "url" => $url
    ]);

} else {

    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => $stmt->error
    ]);
}

/* 🔥 CLEANUP */
$stmt->close();
$conn->close();

?>