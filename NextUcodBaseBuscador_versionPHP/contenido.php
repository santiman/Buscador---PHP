<?php

$file = fopen("data.json", "r");
$contenido = fread($file, filesize("data.json"));
$contenido = json_decode($contenido, true);

echo json_encode($contenido);

fclose($file);
 ?>
