<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include "connection.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["message" => "Método no permitido"]);
    exit;
}

$nombre = $_POST["nombre"] ?? "";
$descripcion = $_POST["descripcion"] ?? "";

if (!$nombre || !isset($_FILES["logo"])) {
    http_response_code(400);
    echo json_encode(["message" => "Faltan datos"]);
    exit;
}

/* ───────── SUBIDA DE IMAGEN ───────── */

$uploadDir = "../uploads/marcas/";

$fileName = time() . "_" . basename($_FILES["logo"]["name"]);

$targetFile = $uploadDir . $fileName;

if (!move_uploaded_file($_FILES["logo"]["tmp_name"], $targetFile)) {
    http_response_code(500);
    echo json_encode(["message" => "Error al subir imagen"]);
    exit;
}

/* URL que se guardará en la BD */
$logo_url = "/uploads/marcas/" . $fileName;

/* ───────── INSERT SQL ───────── */

$sql = "INSERT INTO marca (nombre, descripcion, logo_url, activo)
        VALUES (?, ?, ?, 1)";

$stmt = $conn->prepare($sql);

$stmt->bind_param(
    "sss",
    $nombre,
    $descripcion,
    $logo_url
);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "Marca creada correctamente"
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        "message" => "Error al guardar en BD"
    ]);
}

$stmt->close();
$conn->close();

?>