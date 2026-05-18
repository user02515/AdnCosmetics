<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include "connection.php";

error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["success" => false, "message" => "Método no permitido"]);
    exit;
}

/* ───────── DATOS ───────── */
$nombre = $_POST["nombre"] ?? "";
$marca_id = $_POST["marca_id"] ?? "";
$categoria_id = $_POST["categoria_id"] ?? "";
$administrador_id = $_POST["administrador_id"] ?? 1;

$precio = $_POST["precio_minoritario"] ?? 0;
$descripcion = $_POST["descripcion_corta"] ?? null;
$uso = $_POST["uso"] ?? null;
$publico = $_POST["publico"] ?? null;

/* ───────── VALIDACIÓN ───────── */
if (!$nombre || !$marca_id || !$categoria_id) {
    echo json_encode([
        "success" => false,
        "message" => "Faltan datos obligatorios"
    ]);
    exit;
}

/* ───────── SLUG ───────── */
$slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $nombre)));

/* ───────── SKU ───────── */
$sku = uniqid("SKU-");

/* ───────── INSERT CORRECTO ───────── */
$sql = "INSERT INTO producto (
    marca_id,
    categoria_id,
    administrador_id,
    nombre,
    slug,
    descripcion_corta,
    uso,
    precio_minoritario,
    sku,
    disponible,
    destacado,
    orden,
    publico
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1, 0, 0, ?)";

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
    "iiissssdss",
    $marca_id,
    $categoria_id,
    $administrador_id,
    $nombre,
    $slug,
    $descripcion,
    $uso,
    $precio,
    $sku,
    $publico
);

if ($stmt->execute()) {

    echo json_encode([
        "success" => true,
        "id" => $conn->insert_id
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