<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

error_reporting(E_ALL);
ini_set('display_errors', 0); // 👈 IMPORTANTE: no romper JSON

include "connection.php";

/* ─────────────────────────────
   VALIDACIÓN DE DATOS
───────────────────────────── */

$titulo    = trim($_POST["titulo"] ?? "");
$subtitulo = trim($_POST["subtitulo"] ?? "");
$orden     = isset($_POST["orden"]) ? intval($_POST["orden"]) : 0;

if ($titulo === "" || !isset($_FILES["imagen"]) || empty($_FILES["imagen"]["name"])) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Datos incompletos"
    ]);
    exit();
}

/* ─────────────────────────────
   SUBIDA DE ARCHIVO
───────────────────────────── */

$uploadDir = "../uploads/carousel/";

if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

$ext = strtolower(pathinfo($_FILES["imagen"]["name"], PATHINFO_EXTENSION));

// seguridad básica de extensiones
$allowed = ["jpg", "jpeg", "png", "webp"];

if (!in_array($ext, $allowed)) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Formato de imagen no permitido"
    ]);
    exit();
}

$fileName = uniqid("slide_", true) . "." . $ext;
$targetPath = $uploadDir . $fileName;

if (!move_uploaded_file($_FILES["imagen"]["tmp_name"], $targetPath)) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Error al subir imagen"
    ]);
    exit();
}

$imagen_url = "/uploads/carousel/" . $fileName;

/* ─────────────────────────────
   INSERT BD
───────────────────────────── */

$sql = "
INSERT INTO carrusel_imagen
(titulo, subtitulo, imagen_url, orden, activo)
VALUES (?, ?, ?, ?, 1)
";

$stmt = $conn->prepare($sql);

if (!$stmt) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Error en prepare SQL"
    ]);
    exit();
}

$stmt->bind_param("sssi", $titulo, $subtitulo, $imagen_url, $orden);

if ($stmt->execute()) {

    echo json_encode([
        "success" => true,
        "message" => "Slide creado correctamente",
        "id" => $stmt->insert_id,
        "imagen_url" => $imagen_url
    ]);

} else {

    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Error en base de datos",
        "debug" => $stmt->error
    ]);
}

$stmt->close();
$conn->close();