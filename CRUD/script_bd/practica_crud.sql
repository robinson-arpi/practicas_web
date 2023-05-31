-- Crear la base de datos
CREATE DATABASE practicas_web;

-- Usar la base de datos
USE practicas_web;
DROP TABLE ciudades;
DROP TABLE provincias;

-- Crear la tabla de provincias
CREATE TABLE provincias (
    id INT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

-- Insertar datos en la tabla de provincias
INSERT INTO provincias (id, nombre) VALUES
    (1, 'Azuay'),
    (2, 'Bolívar'),
    (3, 'Cañar'),
    (4, 'Carchi'),
    (5, 'Chimborazo'),
    (6, 'Cotopaxi'),
    (7, 'El Oro'),
    (8, 'Esmeraldas'),
    (9, 'Galápagos'),
    (10, 'Guayas'),
    (11, 'Imbabura'),
    (12, 'Loja'),
    (13, 'Los Ríos'),
    (14, 'Manabí'),
    (15, 'Morona Santiago'),
    (16, 'Napo'),
    (17, 'Orellana'),
    (18, 'Pastaza'),
    (19, 'Pichincha'),
    (20, 'Santa Elena'),
    (21, 'Santo Domingo'),
    (22, 'Sucumbíos'),
    (23, 'Tungurahua'),
    (24, 'Zamora Chinchipe');

UPDATE provincias SET nombre = 'Santo Domingo' WHERE id = 21;

-- Crear la tabla de ciudades
CREATE TABLE ciudades (
    id INT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    provincia_id INT,
    FOREIGN KEY (provincia_id) REFERENCES provincias(id)
);

-- Insertar datos en la tabla de ciudades
INSERT INTO ciudades (id, nombre, provincia_id) VALUES
    (1, 'Cuenca', 1),
    (2, 'Gualaceo', 1),
    (3, 'Guaranda', 2),
    (4, 'San Miguel', 2),
    (5, 'Azogues', 3),
    (6, 'Biblián', 3),
    (7, 'Tulcán', 4),
    (8, 'Montúfar', 4),
    (9, 'Riobamba', 5),
    (10, 'Guano', 5),
    (11, 'Latacunga', 6),
    (12, 'La Maná', 6),
    (13, 'Machala', 7),
    (14, 'Santa Rosa', 7),
    (15, 'Esmeraldas', 8),
    (16, 'Atacames', 8),
    (17, 'Puerto Baquerizo Moreno', 9),
    (18, 'Puerto Ayora', 9),
    (19, 'Guayaquil', 10),
    (20, 'Samborondón', 10),
    (21, 'Ibarra', 11),
    (22, 'Otavalo', 11),
    (23, 'Loja', 12),
    (24, 'Catamayo', 12),
    (25, 'Babahoyo', 13),
    (26, 'Quevedo', 13),
    (27, 'Portoviejo', 14),
    (28, 'Manta', 14),
    (29, 'Macas', 15),
    (30, 'Morona', 15),
    (31, 'Tena', 16),
    (32, 'Archidona', 16),
    (33, 'El Coca', 17),
    (34, 'Francisco de Orellana', 17),
    (35, 'Puyo', 18),
    (36, 'Pastaza', 18),
    (37, 'Quito', 19),
    (38, 'Cayambe', 19),
    (39, 'Salinas', 20),
    (40, 'La Libertad', 20),
    (41, 'Santo Domingo', 21),
    (42, 'La Concordia', 21),
    (43, 'Nueva Loja', 22),
    (44, 'Shushufindi', 22),
    (45, 'Ambato', 23),
    (46, 'Pelileo', 23),
    (47, 'Zamora', 24),
    (48, 'Yantzaza', 24);


USE practicas_web;
DROP TABLE usuarios;
CREATE TABLE Usuarios (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
nombre VARCHAR(50) NOT NULL,
direccion VARCHAR(50) NOT NULL,
telefono VARCHAR(15) NOT NULL,
email VARCHAR(50) NOT NULL,
ciudad INT,
FOREIGN KEY (ciudad) REFERENCES ciudades(id)
);


INSERT INTO Usuarios (nombre, direccion, telefono, email, ciudad) VALUES
	('Robinson Arpi', 'El Valle', '0988062074', 'robinson_gerardo97@outlook.com', 1),
	('David Arpi', '4 Esquinas', '0988072074', 'david_arpi@outlook.com', 1),
    ('Michelle Lojano', 'San Antonio', '0988063074', 'michelle_lojano@gmail.com', 2),
	('Nayeli Lojano', 'San Antonio', '0988052074', 'nayerli_lojano@gmail.com', 3),
    ('Juan Perez', 'La Floresta', '0988012345', 'juan.perez@gmail.com', 4),
    ('María Sánchez', 'Centro Histórico', '0988098765', 'maria.sanchez@gmail.com', 4),
    ('Carlos López', 'El Bosque', '0988012345', 'carlos.lopez@example.com', 5),
    ('Laura Gómez', 'La Mariscal', '0988098765', 'laura.gomez@example.com', 7),
    ('Pedro Mendoza', 'San Blas', '0988076543', 'pedro.mendoza@example.com', 6),
    ('Ana Martínez', 'La Kennedy', '0988065432', 'ana.martinez@example.com', 6);