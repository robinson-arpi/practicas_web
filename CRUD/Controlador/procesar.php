<?php
require_once 'ControladorUsuario.php';

// Crear una instancia del controlador
$controlador = new ControladorUsuario();

// Obtener la acción solicitada desde JavaScript
$accion = isset($_GET['accion']) ? $_GET['accion'] : '';

// Procesar la solicitud
$controlador->procesarSolicitud($accion);
?>
