<?php
$ciudad = $_POST['ciudad'];
$tipo = $_POST['tipo'];

header('content-type: data.json');

$datos = array(
'estado' => 'ok',
'ciudad' => $ciudad,
'tipo' => $tipo
);

echo json_encode($datos);
 ?>
