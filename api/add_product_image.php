<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include "connection.php";

$producto_id = $_POST["producto_id"];
$alt_text = $_POST["alt_text"] ?? "";
$es_principal = $_POST["es_principal"] ?? 1;
$orden = $_POST["orden"] ?? 1;

if (!isset($_FILES["image"])) {
    echo json_encode(["success" => false, "message" => "Sin imagen"]);
    exit;
}

$uploadDir = "../uploads/productos/";
$fileName = time() . "_" . basename($_FILES["image"]["name"]);
$target = $uploadDir . $fileName;

move_uploaded_file($_FILES["image"]["tmp_name"], $target);

$url = "/uploads/productos/" . $fileName;

$sql = "INSERT INTO producto_imagen 
(producto_id, url, alt_text, es_principal, orden)
VALUES (?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("issii", $producto_id, $url, $alt_text, $es_principal, $orden);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false]);
}
?>