

-- Utilities
-- select user from mysql.user;

-- Creamos la BBDD
drop database if exists socialBar;
create database socialBar;


-- Creamos usuario
drop user 'admin_socialBar'@'%';
FLUSH privileges;

CREATE USER 'admin_socialBar'@'%' IDENTIFIED WITH mysql_native_password BY 'Covid-19';
GRANT ALL PRIVILEGES ON socialBar.* TO 'admin_socialBar'@'%' WITH GRANT OPTION;

ALTER USER 'admin_socialBar'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Covid-19';

FLUSH PRIVILEGES;

-- Usar la BBDD 
USE socialBar;

Create table Personal ( 
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	nickname VARCHAR(255) NOT NULL UNIQUE,
	password VARCHAR(255) NOT NULL,
	nombre VARCHAR(255) NOT NULL,
	apellidos VARCHAR(255) NOT NULL,
	avatar VARCHAR(255) DEFAULT "default.png"
);

Create table Locales ( 
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(255) NOT NULL,
	ubicacion VARCHAR(255) NOT NULL,
	imagen VARCHAR(255) DEFAULT "local_default.png"
);

CREATE TABLE Perfiles (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	perfil VARCHAR(255) NOT NULL,
    permisos INT NOT NULL
);

CREATE TABLE LocalesPerfilesPersonal(
	id_personal INT NOT NULL,
	id_perfil INT NOT NULL,
    id_local INT NOT NULL,
	PRIMARY KEY (id_personal , id_perfil, id_local)
);


CREATE TABLE  Mesas ( 
	id INT NOT NULL AUTO_INCREMENT,
    id_local INT NOT NULL,
    id_carta INT,
    id_personal INT,
	estado VARCHAR(255),
    PRIMARY KEY (id, id_local)
);


CREATE TABLE  Cartas ( 
	id INT NOT NULL AUTO_INCREMENT ,
    id_local INT NOT NULL,
	nombre VARCHAR(255),
    PRIMARY KEY (id,id_local)
);


CREATE TABLE PlatosCarta (
	id_plato INT NOT NULL,
	id_carta INT NOT NULL,
	PRIMARY KEY (id_plato , id_carta)
);


CREATE TABLE  Platos ( 
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	titulo VARCHAR(255),
	descripcion TEXT,
	precio DECIMAL,
	imagen VARCHAR(50)
);


CREATE TABLE PlatosComandas ( 
	id_plato INT NOT NULL ,
	id_comanda INT NOT NULL,
    cantidad FLOAT,
	PRIMARY KEY (id_plato , id_comanda)
);

CREATE TABLE Comandas (
    id INT NOT NULL AUTO_INCREMENT,
    id_mesa INT NOT NULL,
    tipo VARCHAR(255),
    fecha DATE,
    estado VARCHAR(255),
    PRIMARY KEY (id, id_mesa)
);

CREATE TABLE Clientes (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nickname VARCHAR(20) NOT NULL UNIQUE,
    nombre VARCHAR(100) NOT NULL,
    apellidos VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE Sesion (
    id INT NOT NULL AUTO_INCREMENT,
    id_cliente INT NOT NULL,
    id_mesa INT,
    fecha DATE,
    PRIMARY KEY(id, id_cliente, id_mesa)
);

