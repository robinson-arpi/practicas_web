<?php
// Clase POJO representa un objeto con sus propiedades y métodos getter y setter
// Creacion clase usuario para representar un objeto USUARIO
class Usuario {
    
    private $id;
    private $nombre;
    private $direccion;
    private $telefono;
    private $email;

    // Métodos getters y setters para las propiedades
    public function id() {
        return $this->id;
    }
    public function setId($id) {
        $this->nombre = $id;
    }
    
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