<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

include "connection.php";

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// obtener última config
$sqlGet = "SELECT id, logo_url FROM configuracion_tienda ORDER BY id DESC LIMIT 1";
$res = $conn->query($sqlGet);
$config = $res->fetch_assoc();

if (!$config) {
    http_response_code(404);
    echo json_encode(["message" => "No existe configuración"]);
    exit;
}

$id = $config["id"];
$oldLogo = $config["logo_url"];

// campos
$numero_whatsapp = $_POST["numero_whatsapp"] ?? "";
$mensaje = $_POST["mensaje_whatsapp_plantilla"] ?? "";
$meta = $_POST["meta_descripcion"] ?? "";

// ── LOGO (opcional) ──
$logo_url = $oldLogo;

if (!empty($_FILES["logo"]["name"])) {

    $uploadDir = "../uploads/configuracion/";

    if (!file_exists($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    $ext = pathinfo($_FILES["logo"]["name"], PATHINFO_EXTENSION);
    $fileName = uniqid("logo_") . "." . $ext;

    $targetPath = $uploadDir . $fileName;

    if (move_uploaded_file($_FILES["logo"]["tmp_name"], $targetPath)) {

        $logo_url = "/uploads/configuracion/" . $fileName;

        // borrar anterior si existe
        if ($oldLogo && file_exists(".." . $oldLogo)) {
            unlink(".." . $oldLogo);
        }
    }
}

// update
$sql = "
UPDATE configuracion_tienda
SET 
    numero_whatsapp = ?,
    mensaje_whatsapp_plantilla = ?,
    meta_descripcion = ?,
    logo_url = ?
WHERE id = ?
";

$stmt = $conn->prepare($sql);
$stmt->bind_param(
    "ssssi",
    $numero_whatsapp,
    $mensaje,
    $meta,
    $logo_url,
    $id
);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "logo_url" => $logo_url
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        "message" => "Error al actualizar"
    ]);
}

$stmt->close();
$conn->close();
?>