<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once "connection.php";

$data = json_decode(file_get_contents("php://input"), true);

$email = $data["email"] ?? "";
$password = $data["password"] ?? "";

if (!$email || !$password) {
    http_response_code(400);
    echo json_encode([
        "message" => "Faltan datos"
    ]);
    exit;
}

$sql = "SELECT * FROM administrador WHERE email = ?";
$stmt = $conn->prepare($sql);

$stmt->bind_param("s", $email);
$stmt->execute();

$result = $stmt->get_result();

if ($result->num_rows === 0) {
    http_response_code(401);
    echo json_encode([
        "message" => "Usuario no encontrado"
    ]);
    exit;
}

$user = $result->fetch_assoc();

if (!password_verify($password, $user["password_hash"])) {
    http_response_code(401);
    echo json_encode([
        "message" => "Contraseña incorrecta"
    ]);
    exit;
}

echo json_encode([
    "success" => true,
    "message" => "Login correcto",
    "admin" => [
        "id" => $user["id"],
        "nombre" => $user["nombre"],
        "email" => $user["email"]
    ],
    "token" => "admin-auth-ok"
]);