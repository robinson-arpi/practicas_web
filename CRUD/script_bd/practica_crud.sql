CREATE DATABASE practicas_web;

use practicas_web;
drop table usuarios;
CREATE TABLE Usuarios (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
nombre VARCHAR(50) NOT NULL,
direccion VARCHAR(50) NOT NULL,
telefono VARCHAR(15) NOT NULL,
email VARCHAR(50) NOT NULL
);

use practicas_web;
SELECT * FROM usuarios;
select * from usuarios;
SELECT MAX(id) AS max_id FROM usuarios;

SELECT * FROM usuarios WHERE nombre LIKE '%ui%' OR direccion LIKE '%ui%' OR telefono LIKE '%ui%' OR email LIKE '%ui%';

INSERT INTO Usuarios (id, nombre, direccion, telefono, email)
VALUES (NULL,'John Doe', '123 Main Street', '555-1234', 'johndoe@example.com');
