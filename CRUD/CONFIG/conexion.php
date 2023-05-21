<?php
  function obtenerConexion() {
    $host = 'localhost:3306';
    $dbname = 'practicas_web';
    $username = 'root';
    $password = '';

    try {
        $conexion = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
        $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $conexion;
    } catch (PDOException $e) {
        echo "Error de conexión: " . $e->getMessage();
        exit;
    }
  }

?>
