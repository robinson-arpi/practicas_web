<?php
require_once '../Modelo/modelo.php';
require_once '../Modelo/Usuario.php';
require_once 'enviarCorreoMailer.php';
require_once 'generarPDF.php';

class ControladorUsuario {
    private $modelo;
    private $tabla = 'usuarios';

    public function __construct() {
        $this->modelo = new Modelo();
    }

    /*-------------------------------------------
    Métodos para CRUD
    --------------------------------------------*/
    public function registrarUsuario($nombre, $direccion, $telefono, $email, $ciudad) {
        $usuario = new Usuario(null, $nombre, $direccion, $telefono, $email, $ciudad);
        $resultado = $this->modelo->insertar($this->tabla, $usuario);
        if ($resultado) {
            echo 'registrado';
        }else {
            echo 'no registrado';
        }
    }

    public function listarUsuarios() {
        $usuarios = $this->modelo->listar($this->tabla);
        return json_encode($usuarios);
    }

    public function actualizarUsuario($id, $nombre, $direccion, $telefono, $email, $ciudad) {
        $usuario = new Usuario($id, $nombre, $direccion, $telefono, $email, $ciudad);
        $condicion = 'id = '.$id;
        $respuesta = $this->modelo->actualizar($this->tabla, $usuario, $condicion);
        if ($respuesta) {
            echo "actualizado";
        } else {
            echo "no actualizado";
        }
    }

    public function eliminarUsuario($id) {
        $condicion = 'id = '.$id;
        $respuesta = $this->modelo->eliminar($this->tabla, $condicion);
        if ($respuesta) {
            echo "eliminado";
        } else {
            echo "no eliminado";
        }
    }
    
    /*-------------------------------------------
    Métodos extra
    --------------------------------------------*/
    public function obtenerSiguienteID(){
        $siguienteID = $this->modelo->obtenerSiguienteID($this->tabla);
        echo $siguienteID;
    }

    public function obtenerUsuarioPorID($id){
        $condicion = 'id = '.intval($id);
        $respuesta = $this->modelo->buscar($this->tabla, $condicion);
        //echo "obtener usuario: ";
        //print_r($respuesta);
        return json_encode($respuesta);
    }    

    public function buscarEnTodo($cadena){
        $usuario = new Usuario(null, $cadena, $cadena, $cadena, $cadena, $cadena);

        $respuesta = $this->modelo->buscarEnTodo($this->tabla, $usuario);
        if ($respuesta) {
            echo json_encode($respuesta);
        } else {
            echo json_encode(array()); // Devuelve un objeto JSON vacío si no se encuentra el usuario
        }
    }
    
    /*-------------------------------------------
    Métodos para provincias
    --------------------------------------------*/
    public function listarProvincias() {
        $provincias = $this->modelo->listar('provincias');
        return json_encode($provincias);
    }

    public function listarCiudades($condicion) {
        $provincias = $this->modelo->buscar('ciudades', $condicion);
        return json_encode($provincias);
    }
    /*-------------------------------------------
    Gestión de conexiones
    --------------------------------------------*/
    public function procesarSolicitud($accion) {
        
        switch ($accion) {
            case 'registrarUsuario':
                $nombre = $_GET['nombre'];
                $direccion = $_GET['direccion'];
                $telefono = $_GET['telefono'];
                $email = $_GET['email'];
                $ciudad = $_GET['ciudad'];
                $this->registrarUsuario($nombre, $direccion, $telefono, $email, $ciudad);
                break;
            case 'enviarCorreo':
                $nombre = $_GET['nombre'];
                $email = $_GET['email'];
                generarPDF($nombre);
                echo enviarCorreo($email, $nombre);
                break;
            case 'actualizarUsuario':
                $nombre = $_GET['nombre'];
                $direccion = $_GET['direccion'];
                $telefono = $_GET['telefono'];
                $email = $_GET['email'];
                $ciudad = $_GET['ciudad'];
                $id = $_GET['id'];
                $this->actualizarUsuario($id, $nombre, $direccion, $telefono, $email, $ciudad);
                break;    
            case 'eliminarUsuario':
                $id = $_GET['id'];
                $this->eliminarUsuario($id);
                break;
            case 'obtenerUsuarioPorID':
                $id = $_GET['id'];
                echo $this->obtenerUsuarioPorID($id);
                break;    
            case 'buscarUsuario':
                $busqueda = $_GET['cadenaBusqueda'];
                echo $this->buscarEnTodo($busqueda);
                break;
            case 'obtenerUsuarios':
                echo $this->listarUsuarios();
                break;
            // Agrega más casos para otras acciones si es necesario
            case 'obtenerSiguienteID':
                $this->obtenerSiguienteID();
                break;
            case 'obtenerProvincias':
                echo $this->listarProvincias();
                break;
            case 'obtenerCiudades':
                $provincia = $_GET['provincia'];
                $condicion = 'provincia_id = '.$provincia;
                echo $this->listarCiudades($condicion);
                break;         
            default:
                echo "Procesando solicitud con acción: " . $accion . "<br>";
                break;
        }
    }
}
/*
$test = new ControladorUsuario();
$resultado =$test->registrarUsuario("hooid", "valle", "123", "robinson.arpi@ucuenca.edu.ec");
echo $resultado;


$test = new ControladorUsuario();
$test->obtenerUsuarioPorID('10');
*/
?>