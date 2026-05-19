<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

header("Content-Type: application/json");

include "connection.php";

$id = $_POST["id"] ?? null;

if (!$id) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "ID requerido"]);
    exit();
}

/* ── OBTENER IMAGEN PARA BORRARLA ── */
$sql = "SELECT imagen_url FROM carrusel_imagen WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();

if (!$row) {
    http_response_code(404);
    echo json_encode(["success" => false, "message" => "No existe"]);
    exit();
}

$imagePath = "../" . $row["imagen_url"];

/* ── BORRAR BD ── */
$del = $conn->prepare("DELETE FROM carrusel_imagen WHERE id = ?");
$del->bind_param("i", $id);

if ($del->execute()) {

    // borrar archivo físico
    if (file_exists($imagePath)) {
        unlink($imagePath);
    }

    echo json_encode([
        "success" => true,
        "message" => "Eliminado correctamente"
    ]);

} else {

    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Error BD"
    ]);
}