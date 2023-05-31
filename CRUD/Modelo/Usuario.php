<?php
// Clase POJO representa un objeto con sus propiedades y métodos getter y setter
// Creacion clase usuario para representar un objeto USUARIO
class Usuario {
    public $id;
    public $nombre;
    public $direccion;
    public $telefono;
    public $email;
    public $ciudad;



    public function __construct($id = null, $nombre = '', $direccion = '', $telefono = '', $email = '', $ciudad = '') {
        $this->id = $id;
        $this->nombre = $nombre;
        $this->direccion = $direccion;
        $this->telefono = $telefono;
        $this->email = $email;
        $this->ciudad = $ciudad;
    }

    // Métodos getters y setters para las propiedades
   
    public function getNombre() {
        return $this->nombre;
    }

    public function setNombre($nombre) {
        $this->nombre = $nombre;
    }
    
    public function getDireccion() {
        return $this->direccion;
    }
    
    public function setDireccion($direccion){
        $this->direccion = $direccion;
    }

    public function getTelefono(){
        return $this->telefono;
    }

    public function setTelefono($telefono){
        $this->telefono = $telefono;
    }

    public function getEmail(){
        return $this->email;
    }

    public function setEmail($email){
        $this->email = $email;
    }

}
?>