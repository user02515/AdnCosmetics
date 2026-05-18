<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include "connection.php";

error_reporting(E_ALL);
ini_set('display_errors', 1);

$id = $_POST["id"] ?? null;
$nombre = $_POST["nombre"] ?? "";
$marca_id = $_POST["marca_id"] ?? 0;
$categoria_id = $_POST["categoria_id"] ?? 0;

$precio = $_POST["precio_minoritario"] ?? 0;
$descripcion = $_POST["descripcion_corta"] ?? null;
$uso = $_POST["uso"] ?? null;
$publico = $_POST["publico"] ?? null;

if (!$id || !$nombre) {
    echo json_encode([
        "success" => false,
        "message" => "Datos incompletos"
    ]);
    exit;
}

/* SLUG */
$slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $nombre)));

$sql = "UPDATE producto SET
    nombre = ?,
    slug = ?,
    marca_id = ?,
    categoria_id = ?,
    descripcion_corta = ?,
    uso = ?,
    precio_minoritario = ?,
    publico = ?
WHERE id = ?";

$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode([
        "success" => false,
        "message" => $conn->error
    ]);
    exit;
}

/* FIX TIPOS CORRECTOS */
$stmt->bind_param(
    "ssiissisi",
    $nombre,
    $slug,
    $marca_id,
    $categoria_id,
    $descripcion,
    $uso,
    $precio,
    $publico,
    $id
);

if ($stmt->execute()) {

    echo json_encode([
        "success" => true,
        "message" => "Producto actualizado correctamente"
    ]);

} else {

    echo json_encode([
        "success" => false,
        "message" => $stmt->error
    ]);
}

$stmt->close();
$conn->close();

?>