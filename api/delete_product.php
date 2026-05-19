<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include "connection.php";

$id = $_POST["id"] ?? null;

if (!$id) {
    echo json_encode(["success" => false, "message" => "ID requerido"]);
    exit;
}

// Eliminar imágenes asociadas primero (integridad referencial)
$stmt1 = $conn->prepare("DELETE FROM producto_imagen WHERE producto_id = ?");
$stmt1->bind_param("i", $id);
$stmt1->execute();
$stmt1->close();

// Eliminar producto
$stmt2 = $conn->prepare("DELETE FROM producto WHERE id = ?");
$stmt2->bind_param("i", $id);

if ($stmt2->execute()) {
    echo json_encode(["success" => true, "message" => "Producto eliminado"]);
} else {
    echo json_encode(["success" => false, "message" => $stmt2->error]);
}

$stmt2->close();
$conn->close();
?>