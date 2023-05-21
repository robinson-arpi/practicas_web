<?php
require_once '../Modelo/modelo.php';
require_once '../CONFIG/conexion.php';

class ControladorUsuario {
    private $modelo;
    private $tabla = 'usuarios';

    public function __construct() {
        $this->modelo = new Modelo();
    }

    // Función para registrar un usuario
    public function registrarUsuario($nombre, $direccion, $telefono, $email) {
        $datos = [
            'nombre' => $nombre,
            'direccion' => $direccion,
            'telefono' => $telefono,
            'email' => $email
        ];
    
        $resultado = $this->modelo->ingresarRegistro($this->tabla, $datos);
        if ($resultado) {
            $respuesta = 'success';
        } else {
            $respuesta = 'no success';
        }
        echo $respuesta;
    }
    
    public function eliminarUsuario($id) {
        $datos = [
            'id' => $id,
        ];
        $resultado = $this->modelo->eliminarRegistro($this->tabla, $datos);
        echo $resultado;
    }

    public function obtenerSiguienteID(){
        $siguienteID = $this->modelo->obtenerSiguienteID($this->tabla);
        echo $siguienteID;
    }
    

    public function obtenerUsuarios() {
        $usuarios = $this->modelo->listarRegistros($this->tabla);
        return json_encode($usuarios);
    }




    public function procesarSolicitud($accion) {
        
        switch ($accion) {
            case 'registrarUsuario':
                $nombre = $_GET['nombre'];
                $direccion = $_GET['direccion'];
                $telefono = $_GET['telefono'];
                $email = $_GET['email'];
                $this->registrarUsuario($nombre, $direccion, $telefono, $email);
                break;
            case 'eliminarUsuario':
                $id = $_GET['id'];
                $this->eliminarUsuario($id);
                break;
            case 'obtenerUsuarios':
                echo $this->obtenerUsuarios();
                break;
            // Agrega más casos para otras acciones si es necesario
            case 'obtenerSiguienteID':
                $this->obtenerSiguienteID();
                break;
            default:
            echo "Procesando solicitud con acción: " . $accion . "<br>";
                break;
        }
    }


}



?>