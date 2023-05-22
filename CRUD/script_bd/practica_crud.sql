CREATE DATABASE practicas_web;

use practicas_web;

CREATE TABLE Usuarios (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
nombre VARCHAR(50) NOT NULL,
direccion VARCHAR(50) NOT NULL,
telefono VARCHAR(15),
email VARCHAR(50),
reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)

use practicas_web;
select * from usuarios;
SELECT MAX(id) AS max_id FROM usuarios;