
/*
Create table Personal ( 
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	nickname VARCHAR(255) NOT NULL UNIQUE,
	password VARCHAR(255) NOT NULL,
	nombre VARCHAR(255) NOT NULL,
	apellidos VARCHAR(255) NOT NULL,
	avatar VARCHAR(255) DEFAULT "default.png"
);
*/

USE socialBar;

INSERT INTO Personal VALUES(NULL,'admin','$2y$13$6XpE954ndmLjl5fneXq5Cu/0GjPgGHrSIYCGeu/Dz2kj4ozlpv5km','Administrador','Del Mundo', NULL);
INSERT INTO Personal VALUES(NULL,'anunezpe','$2y$13$6XpE954ndmLjl5fneXq5Cu/0GjPgGHrSIYCGeu/Dz2kj4ozlpv5km','Adrián','Núñez Pedroche', NULL);
INSERT INTO Personal VALUES(NULL,'apedrochen','$2y$13$6XpE954ndmLjl5fneXq5Cu/0GjPgGHrSIYCGeu/Dz2kj4ozlpv5km','Adrián','Pedroche Núñez', NULL);
INSERT INTO Personal VALUES(NULL,'apedrochep','$2y$13$6XpE954ndmLjl5fneXq5Cu/0GjPgGHrSIYCGeu/Dz2kj4ozlpv5km','Andrés','Pedroche Piqueras', NULL);
INSERT INTO Personal VALUES(NULL,'enunezv','$2y$13$6XpE954ndmLjl5fneXq5Cu/0GjPgGHrSIYCGeu/Dz2kj4ozlpv5km','Eloy','Núñez Villar', NULL);
INSERT INTO Personal VALUES(NULL,'sagudos','$2y$13$6XpE954ndmLjl5fneXq5Cu/0GjPgGHrSIYCGeu/Dz2kj4ozlpv5km','Sandra','Agudo Sánchez', NULL);

/*
Create table Locales ( 
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(255) NOT NULL,
	ubicacion VARCHAR(255) NOT NULL,
	imagen VARCHAR(255) DEFAULT "local_default.png"
);
*/

INSERT INTO Locales VALUES(NULL,'La Repera','Calle Padre Vicente Cabanes,Torrent, Valencia',NULL);
INSERT INTO Locales VALUES(NULL,'La Tasquita','Calle Fray Antonio Panes,Torrent, Valencia',NULL);
INSERT INTO Locales VALUES(NULL,'La Garci','Polígono Masía del Juez carretera principal, Torrent, Valencia',NULL);
INSERT INTO Locales VALUES(NULL,'La Bugui','Calle Padre Méndez, Torrent, Valencia',NULL);

/*
CREATE TABLE Perfiles (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	perfil VARCHAR(255) NOT NULL,
    permisos INT NOT NULL
);
*/

INSERT INTO Perfiles VALUES(NULL,'admin',9001);
INSERT INTO Perfiles VALUES(NULL,'Propietario',1100);
INSERT INTO Perfiles VALUES(NULL,'Trabajador',1010);
INSERT INTO Perfiles VALUES(NULL,'Usuario',1000);
INSERT INTO Perfiles VALUES(NULL,'Moderador',9000);


/*
CREATE TABLE LocalesPerfilesPersonal(
	id_personal INT NOT NULL,
	id_perfil INT NOT NULL,
    id_local INT NOT NULL,
	PRIMARY KEY (id_personal , id_perfil, id_local)
);
*/

INSERT INTO LocalesPerfilesPersonal VALUES(1,1,1);
INSERT INTO LocalesPerfilesPersonal VALUES(1,1,2);
INSERT INTO LocalesPerfilesPersonal VALUES(1,1,3);
INSERT INTO LocalesPerfilesPersonal VALUES(1,1,4);
INSERT INTO LocalesPerfilesPersonal VALUES(2,2,1);
INSERT INTO LocalesPerfilesPersonal VALUES(3,2,2);
INSERT INTO LocalesPerfilesPersonal VALUES(4,2,3);
INSERT INTO LocalesPerfilesPersonal VALUES(5,2,4);


/*
CREATE TABLE  Mesas ( 
	id INT NOT NULL AUTO_INCREMENT,
    id_local INT NOT NULL,
    id_carta INT,
    id_personal INT,
	estado VARCHAR(255),
    PRIMARY KEY (id, id_local)
);
*/


INSERT INTO Mesas VALUES(NULL,1,NULL,NULL,'Vacía');
INSERT INTO Mesas VALUES(NULL,1,NULL,NULL,'Vacía');
INSERT INTO Mesas VALUES(NULL,1,NULL,NULL,'Vacía');
INSERT INTO Mesas VALUES(NULL,1,NULL,NULL,'Vacía');
INSERT INTO Mesas VALUES(NULL,1,NULL,NULL,'Vacía');
INSERT INTO Mesas VALUES(NULL,1,NULL,NULL,'Vacía');
INSERT INTO Mesas VALUES(NULL,1,NULL,NULL,'Vacía');
INSERT INTO Mesas VALUES(NULL,1,NULL,NULL,'Vacía');
INSERT INTO Mesas VALUES(NULL,2,NULL,NULL,'Vacía');
INSERT INTO Mesas VALUES(NULL,2,NULL,NULL,'Vacía');
INSERT INTO Mesas VALUES(NULL,2,NULL,NULL,'Vacía');
INSERT INTO Mesas VALUES(NULL,2,NULL,NULL,'Vacía');
INSERT INTO Mesas VALUES(NULL,2,NULL,NULL,'Vacía');
INSERT INTO Mesas VALUES(NULL,2,NULL,NULL,'Vacía');
INSERT INTO Mesas VALUES(NULL,2,NULL,NULL,'Vacía');
INSERT INTO Mesas VALUES(NULL,2,NULL,NULL,'Vacía');
INSERT INTO Mesas VALUES(NULL,2,NULL,NULL,'Vacía');
INSERT INTO Mesas VALUES(NULL,4,NULL,NULL,'Vacía');
INSERT INTO Mesas VALUES(NULL,4,NULL,NULL,'Vacía');
INSERT INTO Mesas VALUES(NULL,4,NULL,NULL,'Vacía');
INSERT INTO Mesas VALUES(NULL,3,NULL,NULL,'Vacía');
INSERT INTO Mesas VALUES(NULL,3,NULL,NULL,'Vacía');
INSERT INTO Mesas VALUES(NULL,3,NULL,NULL,'Vacía');
INSERT INTO Mesas VALUES(NULL,3,NULL,NULL,'Vacía');

/*
CREATE TABLE  Cartas ( 
	id INT NOT NULL AUTO_INCREMENT ,
    id_local INT NOT NULL,
	nombre VARCHAR(255) NOT NULL,
	descripcion VARCHAR(255),
	imagen VARCHAR(255) DEFAULT "local_default.png"
    PRIMARY KEY (id,id_local)
);
*/


INSERT INTO Cartas VALUES(NULL,1,'Carta Semanal la Repera','Carta de lunes a viernes',NULL);
INSERT INTO Cartas VALUES(NULL,1,'Carta Almuerzos la Repera', 'Carta de almuerzos de sábados',NULL);
INSERT INTO Cartas VALUES(NULL,1,'Carta Cenas la Repera', 'Carta de cenas de lunes a viernes',NULL);
INSERT INTO Cartas VALUES(NULL,1,'Carta Fines de Semana la Repera','Carta de fines de semana',NULL);
INSERT INTO Cartas VALUES(NULL,2,'Carta Semanal la Tasquita','Carta de lunes a viernes',NULL);
INSERT INTO Cartas VALUES(NULL,2,'Carta Almuerzos la Tasquita','Carta de almuerzos semanal',NULL);
INSERT INTO Cartas VALUES(NULL,2,'Carta Cenas la Tasquita','Carta de cenas entre semana',NULL);
INSERT INTO Cartas VALUES(NULL,2,'Carta Fines de Semana la Tasquita','Carta de fines de semana',NULL);
INSERT INTO Cartas VALUES(NULL,3,'Carta Semanal la Garci','Carta para toda la semana',NULL);
INSERT INTO Cartas VALUES(NULL,4,'Carta Semanal la Bugui','Carta para toda la semana',NULL);
INSERT INTO Cartas VALUES(NULL,4,'Carta de arroces de la Bugui','Carta de arroces para las comidas',NULL);
/*
CREATE TABLE PlatosCarta (
	id_plato INT NOT NULL,
	id_carta INT NOT NULL,
	id_categoria INT,
	PRIMARY KEY (id_plato , id_carta)
);
*/


INSERT INTO PlatosCarta VALUES(1,1,1);
INSERT INTO PlatosCarta VALUES(1,2,1);
INSERT INTO PlatosCarta VALUES(1,3,1);
INSERT INTO PlatosCarta VALUES(1,4,1);
INSERT INTO PlatosCarta VALUES(1,5,1);
INSERT INTO PlatosCarta VALUES(1,6,1);
INSERT INTO PlatosCarta VALUES(1,7,1);
INSERT INTO PlatosCarta VALUES(1,8,1);
INSERT INTO PlatosCarta VALUES(1,9,1);
INSERT INTO PlatosCarta VALUES(1,10,1);
INSERT INTO PlatosCarta VALUES(2,1,1);
INSERT INTO PlatosCarta VALUES(2,2,1);
INSERT INTO PlatosCarta VALUES(2,3,1);
INSERT INTO PlatosCarta VALUES(2,4,1);
INSERT INTO PlatosCarta VALUES(2,5,1);
INSERT INTO PlatosCarta VALUES(2,6,1);
INSERT INTO PlatosCarta VALUES(2,7,1);
INSERT INTO PlatosCarta VALUES(2,8,1);
INSERT INTO PlatosCarta VALUES(2,9,1);
INSERT INTO PlatosCarta VALUES(2,10,1);

INSERT INTO PlatosPersonal VALUES(1,1);
INSERT INTO PlatosPersonal VALUES(2,1);

/*
CREATE TABLE  Platos ( 
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	titulo VARCHAR(255),
	descripcion TEXT,
	precio DECIMAL,
	imagen VARCHAR(50)
);
*/

INSERT INTO Platos VALUES(NULL, 'Bravas', 'Patas bravas con alioli y salsa picante', 3.50, 'bravas.png');
INSERT INTO Platos VALUES(NULL, 'Calamares', 'Calamares del mar cantábrico', 4.50, 'calamares.png');


/*
CREATE TABLE PlatosComandas ( 
	id_plato INT NOT NULL ,
	id_comanda INT NOT NULL,
    cantidad FLOAT,
	PRIMARY KEY (id_plato , id_comanda)
);


CREATE TABLE Categorias (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(255) NOT NULL
)
*/

INSERT INTO Categorias VALUES(NULL,'Tapas');
INSERT INTO Categorias VALUES(NULL,'Entrantes');
INSERT INTO Categorias VALUES(NULL,'Bocadillos');
INSERT INTO Categorias VALUES(NULL,'Platos');
INSERT INTO Categorias VALUES(NULL,'Arroces');
INSERT INTO Categorias VALUES(NULL,'Carnes');
INSERT INTO Categorias VALUES(NULL,'Pescados');
INSERT INTO Categorias VALUES(NULL,'Postres');
INSERT INTO Categorias VALUES(NULL,'Bebidas');
INSERT INTO Categorias VALUES(NULL,'Cervezas');
INSERT INTO Categorias VALUES(NULL,'Vinos');
INSERT INTO Categorias VALUES(NULL,'Licores');
/*
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
*/