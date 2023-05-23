<?php
require_once '../Modelo/modelo.php';
require_once '../CONFIG/conexion.php';
require_once 'enviarCorreo.php';
require_once 'generarPDF.php';

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
            generarPDF($nombre);
            enviarCorreo($email, $nombre);
            $respuesta = 'success';
        }else {
            $respuesta = 'no success';
        }
        echo $respuesta;
    }

    public function actualizarUsuario($id, $nombre, $direccion, $telefono, $email) {
        $datos = [
            'nombre' => $nombre,
            'direccion' => $direccion,
            'telefono' => $telefono,
            'email' => $email
        ];
    
        $condicion = 'id = :id';
        $datos['id'] = $id;
    
        $filasActualizadas = $this->modelo->actualizarRegistro($this->tabla, $datos, $condicion);
    
        if ($filasActualizadas > 0) {
            echo "Actualizado";
        } else {
            echo "No actualizado";
        }
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
    public function obtenerUsuarioPorID($id){
        $datos = [
            'id' => $id,
        ];
        $usuario = $this->modelo->recuperarRegistro($this->tabla, $datos);
        if ($usuario) {
            echo json_encode($usuario);
        } else {
            echo json_encode(array()); // Devuelve un objeto JSON vacío si no se encuentra el usuario
        }
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
            case 'actualizarUsuario':
                $nombre = $_GET['nombre'];
                $direccion = $_GET['direccion'];
                $telefono = $_GET['telefono'];
                $email = $_GET['email'];
                $id = $_GET['id'];
                $this->actualizarUsuario($id, $nombre, $direccion, $telefono, $email);
                break;    
            case 'eliminarUsuario':
                $id = $_GET['id'];
                $this->eliminarUsuario($id);
                break;
            case 'obtenerUsuarioPorID':
                $id = $_GET['id'];
                echo $this->obtenerUsuarioPorID($id);
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