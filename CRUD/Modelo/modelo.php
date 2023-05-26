<?php
require_once 'Usuario.php';
require_once '../CONFIG/conexion.php';
class Modelo {
    private $conexion;

    /*-------------------------------------------
    Gestion de clase
    --------------------------------------------*/
    public function __construct() {
        $this->conexion = obtenerConexion();
    }
    public function __destruct() {
        $this->conexion = null;
    }
    
    /*-------------------------------------------
    Métodos para CRUD
    --------------------------------------------*/
    public function insertar($tabla, $data){
        $atributos = get_object_vars($data);
        $columnas = implode(", ", array_keys($atributos));
        $valores = implode("', '", array_values($atributos));
        $consulta = "INSERT INTO $tabla ($columnas) VALUES ('$valores')"; // Solo para fines de depuración
        $resultado = $this->conexion->query($consulta);
        if($resultado){
            return true;
        }else{
            return false;
        }
    }

    public function listar($tabla) {
        $sql = "SELECT * FROM $tabla";
        $resultado = $this->conexion->query($sql);
        if($resultado){
            return $resultado->fetchAll(PDO::FETCH_ASSOC);
        }else{
            return false;
        }    
    }

    public function actualizar($tabla, $objeto, $condicion){
        $set = "";
        $atributos = get_object_vars($objeto);
        foreach ($atributos as $columna => $valor) {
            if (is_string($valor)){
                $set .= "$columna = '$valor', ";
            }else{
                $set .= "$columna = $valor, ";
            }
        }
        $set = rtrim($set, ", ");
        $consulta = "UPDATE $tabla SET $set WHERE $condicion";
        //echo $consulta;
        $resultado = $this->conexion->query($consulta);
        if($resultado){
            return true;
        }else{
            return false;
        }
    }

    public function eliminar($tabla, $condicion) {
        $consulta_sql = "DELETE FROM $tabla WHERE $condicion";
        $resultado = $this->conexion->query($consulta_sql);
        if ($resultado) {
            return true;
        } else {
            return false;
        }
    }

    public function buscar($tabla, $condicion) {
        $sql = "SELECT * FROM $tabla WHERE $condicion";
        //echo $sql;
        $resultado = $this->conexion->query($sql);
        if($resultado){
            return $resultado->fetchAll(PDO::FETCH_ASSOC);
        }else{
            return false;
        }    
    }    
    /*-------------------------------------------
    Métodos extra
    --------------------------------------------*/
    public function buscarEnTodo($tabla, $objeto){
        $condiciones = [];
        $atributos = get_object_vars($objeto);
        foreach ($atributos as $columna => $valor) {
            if (!is_null($valor)){
                $condiciones[] = "$columna LIKE '%$valor%'";
            }
        }
        $condicion = implode(' OR ', $condiciones);
        $consulta_sql = "SELECT * FROM $tabla WHERE $condicion";
        //echo $consulta_sql;
        $resultado = $this->conexion->query($consulta_sql);
        if($resultado){
            return $resultado->fetchAll(PDO::FETCH_ASSOC);
        }else{
            return false;
        }
    }

    
    
    public function obtenerSiguienteID($tabla) {
        $sql = "SELECT MAX(id) AS max_id FROM $tabla";
        $statement = $this->conexion->prepare($sql);
        $statement->execute();
        $resultado = $statement->fetch(PDO::FETCH_ASSOC);
        $siguienteID = $resultado['max_id'] + 1;
        return $siguienteID;
    }

     // Método para recuperar un registro por su ID
     public function recuperarRegistroPorID($tabla, $datos) {
        if (!empty($tabla) && !empty($datos['id'])) {
            $id = intval($datos['id']);
            $sql = "SELECT * FROM $tabla WHERE id = :id";

            $statement = $this->conexion->prepare($sql);
            $statement->execute([':id' => $id]);

            $resultado = $statement->fetch(PDO::FETCH_ASSOC);

            return $resultado;
        }

        return null;
    }
}
/*
$test = new Modelo();
$usuario = new Usuario(1,"cambio", "Cambio", "Cambio", "Cambio");
$cond = "id = 1";
$test->actualizar("Usuarios", $usuario, $cond);
*/
?>
