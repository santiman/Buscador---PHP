<?php

$data = file_get_contents("data.json");
$info = json_decode($data);
$ciudades = [];
foreach ($info as $key => $json) {
$ciudades[] = $json->Ciudad;
}
$ciudades = array_unique($ciudades);
$ciudadesOpt = "";
foreach ($ciudades as $ciudad) {
$ciudadesOpt .= "<option value=\"$ciudad\">$ciudad</option>";
}
echo $ciudadesOpt;

 ?>
