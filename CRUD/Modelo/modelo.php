<?php

class Modelo {
    private $conexion;

    public function __construct() {
        // Establece la conexión a la base de datos en el constructor
        $this->conexion = obtenerConexion();
    }

    // Método para ingresar un registro en la tabla
    public function ingresarRegistro($tabla, $datos) {
        if (!empty($tabla) && !empty($datos)) {
            $columnas = implode(", ", array_keys($datos));
            $placeholders = ":" . implode(", :", array_keys($datos));

            $sql = "INSERT INTO $tabla ($columnas) VALUES ($placeholders)";

            $statement = $this->conexion->prepare($sql);
            $statement->execute($datos);

            return $statement->rowCount();
        }

        return 0;
    }

    // Método para actualizar un registro en la tabla
    public function actualizarRegistro($tabla, $datos, $condicion) {
        if (!empty($tabla) && !empty($datos) && !empty($condicion)) {
            $set = "";
            foreach ($datos as $columna => $valor) {
                $set .= "$columna = :$columna, ";
            }
            $set = rtrim($set, ", ");

            $sql = "UPDATE $tabla SET $set WHERE $condicion";

            $statement = $this->conexion->prepare($sql);
            $statement->execute($datos);

            return $statement->rowCount();
        }

        return 0;
    }

    // Método para buscar registros en la tabla
    public function buscarRegistros($tabla, $condicion) {
        if (!empty($tabla) && !empty($condicion)) {
            $sql = "SELECT * FROM $tabla WHERE $condicion";

            $statement = $this->conexion->prepare($sql);
            $statement->execute();

            $resultado = $statement->fetchAll(PDO::FETCH_ASSOC);

            return $resultado;
        }

        return null;
    }

    // Método para listar todos los registros de la tabla
    public function listarRegistros($tabla) {
        if (!empty($tabla)) {
            $sql = "SELECT * FROM $tabla";
            $statement = $this->conexion->prepare($sql);
            $statement->execute();
            $resultado = $statement->fetchAll(PDO::FETCH_ASSOC);
            return $resultado;
        }
        return null;
    }

    // Método para recuperar un registro por su ID
    public function recuperarRegistro($tabla, $id) {
        if (!empty($tabla) && !empty($id)) {
            $sql = "SELECT * FROM $tabla WHERE id = :id";

            $statement = $this->conexion->prepare($sql);
            $statement->execute(array(':id' => $id));

            $resultado = $statement->fetch(PDO::FETCH_ASSOC);

            return $resultado;
        }

        return null;
    }

    public function eliminarRegistro($tabla, $id) {
        if (!empty($tabla) && !empty($id)) {
            $sql = "DELETE FROM $tabla WHERE id = :id";
            $statement = $this->conexion->prepare($sql);
            $statement->execute(array(':id' => $id));
            $rowCount = $statement->rowCount();
            
            // Verificar si se eliminó correctamente el registro
            if ($rowCount > 0) {
                return 'eliminado'; // Eliminación exitosa
            } else {
                return 'no eliminado'; // No se eliminó ningún registro
            }
        }
        return null; // Parámetros vacíos
    }

    // ... otros métodos

    public function __destruct() {
        // Cierra la conexión a la base de datos en el destructor
        $this->conexion = null;
    }
}
