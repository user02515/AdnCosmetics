<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include "connection.php";

// datos
$id = $_POST["id"] ?? null;
$nombre = $_POST["nombre"] ?? null;
$descripcion = $_POST["descripcion"] ?? null;

if (!$id || !$nombre) {
    http_response_code(400);
    echo json_encode(["message" => "Datos incompletos"]);
    exit;
}

// 1. obtener imagen actual
$sql = "SELECT logo_url FROM marca WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();
$current = $result->fetch_assoc();

if (!$current) {
    http_response_code(404);
    echo json_encode(["message" => "Marca no encontrada"]);
    exit;
}

$logo_url = $current["logo_url"];

// 2. si hay nueva imagen
if (isset($_FILES["logo"])) {

    $file = $_FILES["logo"];

    $ext = pathinfo($file["name"], PATHINFO_EXTENSION);
    $filename = uniqid("brand_") . "." . $ext;

    $folder = __DIR__ . "/../uploads/marcas/";
    $uploadPath = $folder . $filename;

    // crear carpeta si no existe
    if (!file_exists("uploads/marcas/")) {
        mkdir("uploads/marcas/", 0777, true);
    }

    if (move_uploaded_file($file["tmp_name"], $uploadPath)) {

        // borrar anterior si existe
        $fullOldPath = __DIR__ . "/../" . $logo_url;

        if ($logo_url && file_exists($fullOldPath)) {
            unlink($fullOldPath);
        }

        $logo_url = $uploadPath;
    }
}

// 3. update en BD
$sql = "UPDATE marca 
        SET nombre = ?, descripcion = ?, logo_url = ?
        WHERE id = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("sssi", $nombre, $descripcion, $logo_url, $id);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "Marca actualizada correctamente"
    ]);
} else {
    http_response_code(500);
    echo json_encode(["message" => "Error al actualizar"]);
}

$stmt->close();
$conn->close();

?>