-- MySQL dump 10.13  Distrib 8.0.20, for Linux (x86_64)
--
-- Host: localhost    Database: socialBar
-- ------------------------------------------------------
-- Server version	8.0.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Cartas`
--

DROP TABLE IF EXISTS `Cartas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Cartas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_local` int NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `imagen` varchar(255) DEFAULT 'default_card.jpg',
  PRIMARY KEY (`id`,`id_local`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Cartas`
--

LOCK TABLES `Cartas` WRITE;
/*!40000 ALTER TABLE `Cartas` DISABLE KEYS */;
INSERT INTO `Cartas` VALUES (1,1,'Carta Semanal la Repera','Carta de lunes a viernes',NULL),(2,1,'Carta Almuerzos la Repera','Carta de almuerzos de sábados',NULL),(3,1,'Carta Cenas la Repera','Carta de cenas de lunes a viernes',NULL),(4,1,'Carta Fines de Semana la Repera','Carta de fines de semana',NULL),(5,2,'Carta Semanal la Tasquita','Carta de lunes a viernes',NULL),(6,2,'Carta Almuerzos la Tasquita','Carta de almuerzos semanal',NULL),(7,2,'Carta Cenas la Tasquita','Carta de cenas entre semana',NULL),(8,2,'Carta Fines de Semana la Tasquita','Carta de fines de semana',NULL),(9,3,'Carta Semanal la Garci','Carta para toda la semana',NULL),(10,4,'Carta Semanal la Bugui','Carta para toda la semana',NULL),(11,4,'Carta de arroces de la Bugui','Carta de arroces para las comidas',NULL),(12,5,'Carta Almuerzos','Carta de almuerzos de El Garito','Carta Almuerzos_1592269101101_.jpeg'),(13,5,'Semanal','Carta semanal','Semanal_1592271148809_.jpeg'),(14,5,'Fines de semana','Carta de fines de semana','default_card.svg');
/*!40000 ALTER TABLE `Cartas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Categorias`
--

DROP TABLE IF EXISTS `Categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Categorias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Categorias`
--

LOCK TABLES `Categorias` WRITE;
/*!40000 ALTER TABLE `Categorias` DISABLE KEYS */;
INSERT INTO `Categorias` VALUES (1,'Tapas'),(2,'Entrantes'),(3,'Bocadillos'),(4,'Platos'),(5,'Arroces'),(6,'Carnes'),(7,'Pescados'),(8,'Postres'),(9,'Bebidas'),(10,'Cervezas'),(11,'Vinos'),(12,'Licores');
/*!40000 ALTER TABLE `Categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Clientes`
--

DROP TABLE IF EXISTS `Clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Clientes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nickname` varchar(20) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellidos` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nickname` (`nickname`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Clientes`
--

LOCK TABLES `Clientes` WRITE;
/*!40000 ALTER TABLE `Clientes` DISABLE KEYS */;
/*!40000 ALTER TABLE `Clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Comandas`
--

DROP TABLE IF EXISTS `Comandas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Comandas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_mesa` int NOT NULL,
  `tipo` varchar(255) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `estado` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`,`id_mesa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Comandas`
--

LOCK TABLES `Comandas` WRITE;
/*!40000 ALTER TABLE `Comandas` DISABLE KEYS */;
/*!40000 ALTER TABLE `Comandas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Locales`
--

DROP TABLE IF EXISTS `Locales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Locales` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `ubicacion` varchar(255) NOT NULL,
  `imagen` varchar(255) DEFAULT 'default_establishment.jpg',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Locales`
--

LOCK TABLES `Locales` WRITE;
/*!40000 ALTER TABLE `Locales` DISABLE KEYS */;
INSERT INTO `Locales` VALUES (1,'La Repera','Calle Padre Vicente Cabanes,Torrent, Valencia',NULL),(2,'La Tasquita','Calle Fray Antonio Panes,Torrent, Valencia',NULL),(3,'La Garci','Polígono Masía del Juez carretera principal, Torrent, Valencia',NULL),(4,'La Bugui','Calle Padre Méndez, Torrent, Valencia',NULL),(5,'El garito','Torrent','El garito_1592268925648_.jpeg');
/*!40000 ALTER TABLE `Locales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LocalesPerfilesPersonal`
--

DROP TABLE IF EXISTS `LocalesPerfilesPersonal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `LocalesPerfilesPersonal` (
  `id_personal` int NOT NULL,
  `id_perfil` int NOT NULL,
  `id_local` int NOT NULL,
  PRIMARY KEY (`id_personal`,`id_perfil`,`id_local`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LocalesPerfilesPersonal`
--

LOCK TABLES `LocalesPerfilesPersonal` WRITE;
/*!40000 ALTER TABLE `LocalesPerfilesPersonal` DISABLE KEYS */;
INSERT INTO `LocalesPerfilesPersonal` VALUES (1,1,1),(1,1,2),(1,1,3),(1,1,4),(2,2,1),(3,2,2),(4,2,3),(5,2,4),(7,2,5);
/*!40000 ALTER TABLE `LocalesPerfilesPersonal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Mesas`
--

DROP TABLE IF EXISTS `Mesas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Mesas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_local` int NOT NULL,
  `id_carta` int DEFAULT NULL,
  `id_personal` int DEFAULT NULL,
  `estado` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`,`id_local`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Mesas`
--

LOCK TABLES `Mesas` WRITE;
/*!40000 ALTER TABLE `Mesas` DISABLE KEYS */;
INSERT INTO `Mesas` VALUES (1,1,NULL,NULL,'Vacía'),(2,1,NULL,NULL,'Vacía'),(3,1,NULL,NULL,'Vacía'),(4,1,NULL,NULL,'Vacía'),(5,1,NULL,NULL,'Vacía'),(6,1,NULL,NULL,'Vacía'),(7,1,NULL,NULL,'Vacía'),(8,1,NULL,NULL,'Vacía'),(9,2,NULL,NULL,'Vacía'),(10,2,NULL,NULL,'Vacía'),(11,2,NULL,NULL,'Vacía'),(12,2,NULL,NULL,'Vacía'),(13,2,NULL,NULL,'Vacía'),(14,2,NULL,NULL,'Vacía'),(15,2,NULL,NULL,'Vacía'),(16,2,NULL,NULL,'Vacía'),(17,2,NULL,NULL,'Vacía'),(18,4,NULL,NULL,'Vacía'),(19,4,NULL,NULL,'Vacía'),(20,4,NULL,NULL,'Vacía'),(21,3,NULL,NULL,'Vacía'),(22,3,NULL,NULL,'Vacía'),(23,3,NULL,NULL,'Vacía'),(24,3,NULL,NULL,'Vacía'),(25,5,NULL,NULL,'Vacía'),(26,5,NULL,NULL,'Vacía'),(27,5,NULL,NULL,'Vacía'),(28,5,NULL,NULL,'Vacía'),(29,5,NULL,NULL,'Vacía'),(30,5,NULL,NULL,'Vacía'),(31,5,NULL,NULL,'Vacía'),(32,5,NULL,NULL,'Vacía'),(33,5,NULL,NULL,'Vacía'),(34,5,NULL,NULL,'Vacía'),(35,5,NULL,NULL,'Vacía'),(36,5,NULL,NULL,'Vacía'),(37,5,NULL,NULL,'Vacía'),(38,5,NULL,NULL,'Vacía'),(39,5,NULL,NULL,'Vacía'),(40,5,NULL,NULL,'Vacía'),(41,5,NULL,NULL,'Vacía'),(42,5,NULL,NULL,'Vacía'),(43,5,NULL,NULL,'Vacía'),(44,5,NULL,NULL,'Vacía');
/*!40000 ALTER TABLE `Mesas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Perfiles`
--

DROP TABLE IF EXISTS `Perfiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Perfiles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `perfil` varchar(255) NOT NULL,
  `permisos` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Perfiles`
--

LOCK TABLES `Perfiles` WRITE;
/*!40000 ALTER TABLE `Perfiles` DISABLE KEYS */;
INSERT INTO `Perfiles` VALUES (1,'admin',9001),(2,'Propietario',1100),(3,'Trabajador',1010),(4,'Usuario',1000),(5,'Moderador',9000);
/*!40000 ALTER TABLE `Perfiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Personal`
--

DROP TABLE IF EXISTS `Personal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Personal` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nickname` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellidos` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT 'default_user.jpg',
  PRIMARY KEY (`id`),
  UNIQUE KEY `nickname` (`nickname`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Personal`
--

LOCK TABLES `Personal` WRITE;
/*!40000 ALTER TABLE `Personal` DISABLE KEYS */;
INSERT INTO `Personal` VALUES (1,'admin','$2y$13$6XpE954ndmLjl5fneXq5Cu/0GjPgGHrSIYCGeu/Dz2kj4ozlpv5km','Administrador','Del Mundo',NULL),(2,'anunezpe','$2y$13$6XpE954ndmLjl5fneXq5Cu/0GjPgGHrSIYCGeu/Dz2kj4ozlpv5km','Adrián','Núñez Pedroche',NULL),(3,'apedrochen','$2y$13$6XpE954ndmLjl5fneXq5Cu/0GjPgGHrSIYCGeu/Dz2kj4ozlpv5km','Adrián','Pedroche Núñez',NULL),(4,'apedrochep','$2y$13$6XpE954ndmLjl5fneXq5Cu/0GjPgGHrSIYCGeu/Dz2kj4ozlpv5km','Andrés','Pedroche Piqueras',NULL),(5,'enunezv','$2y$13$6XpE954ndmLjl5fneXq5Cu/0GjPgGHrSIYCGeu/Dz2kj4ozlpv5km','Eloy','Núñez Villar',NULL),(6,'sagudos','$2y$13$6XpE954ndmLjl5fneXq5Cu/0GjPgGHrSIYCGeu/Dz2kj4ozlpv5km','Sandra','Agudo Sánchez',NULL),(7,'anunezpedroche','$2a$13$fIOlI/sNhIZjWvLIhgH0O..Ob8GM0nGEygrwL07snSasXM5MlQQLa','Adrián','Núñez Pedroche','default_user.jpg');
/*!40000 ALTER TABLE `Personal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Platos`
--

DROP TABLE IF EXISTS `Platos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Platos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) DEFAULT NULL,
  `descripcion` text,
  `precio` decimal(10,0) DEFAULT NULL,
  `imagen` varchar(50) DEFAULT NULL,
  `id_categoria` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Platos`
--

LOCK TABLES `Platos` WRITE;
/*!40000 ALTER TABLE `Platos` DISABLE KEYS */;
INSERT INTO `Platos` VALUES (1,'Bravas','Patas bravas con alioli y salsa picante',4,'bravas.png',1),(2,'Calamares','Calamares del mar cantábrico',5,'calamares.png',1),(3,'Paella Valenciana','Paella tradicional valenciana',13,'Paella Valenciana_1592269853472_7.jpeg',5),(4,'Arroz a banda','Arroz de marisco',16,'Arroz a banda_1592269968660_7.jpeg',5),(5,'Arroz del senyoret','Arroz del senyoret',16,'Arroz del senyoret_1592270029001_7.jpeg',5),(6,'Arroz al horno','Arroz al horno valenciano',14,'Arroz al horno_1592270070351_7.jpeg',5),(7,'Arroz con bogavante','Arroz meloso de bogavante',21,'Arroz con bogavante_1592270103157_7.jpeg',5),(8,'Pollito','Bocadillo de pollo con cosas veganas',4,'Pollito_1592270163737_7.jpeg',3),(9,'Sepia','Ración de sepia',8,'Sepia_1592270197098_7.jpeg',1),(10,'Esgarraet','Plato típico de pimiento y bacalao',7,'Esgarraet_1592270229363_7.jpeg',1),(11,'Chivito','Bocadillo de lomo con condimentos',6,'Chivito_1592270262475_7.jpeg',3),(12,'Calamares plancha','Calamares a la plancha con salsa mary',7,'Calamares plancha_1592270301894_7.jpeg',1),(13,'Cerveza','Licor del Valhala',2,'Cerveza_1592270340602_7.jpeg',9),(14,'Clotxina','Mejillón de València',6,'Clotxina_1592270380867_7.jpeg',2),(15,'Coca Cola','Refresco',2,'Coca Cola_1592270424368_7.jpeg',9),(16,'Bocadillo de caballo','Aún relincha',5,'Bocadillo de caballo_1592270449406_7.jpeg',3),(17,'Ensalada César','Versión no saludable de una ensalada',5,'Ensalada César_1592270492899_7.jpeg',4),(18,'Fanta','Refresco de sabores cítricos',2,'Fanta_1592270527564_7.jpeg',9),(19,'Agua mineral','Para los healthie',1,'Agua mineral_1592270598970_7.jpeg',9),(20,'Almussafes','Bocadillo de sobrasada con cosas',4,'Almussafes_1592270633609_7.jpeg',3),(21,'Brascada','Clasicazo',4,'Brascada_1592270664228_7.jpeg',3),(22,'Macarrones boloñesa','Sabor de Italia',6,'Macarrones boloñesa_1592270716483_7.jpeg',4),(23,'Macarrones Carbonara','Los auténticos, no la adaptación que hacemos aquí',6,'Macarrones Carbonara_1592270757655_7.jpeg',4),(24,'Bravas','Clásico entre tapas',5,'Bravas_1592270795617_7.jpeg',1),(25,'Fruta','Para los que piden agua',3,'Fruta_1592270825213_7.jpeg',8),(26,'Cortado','Café cortado',2,'Cortado_1592270860226_7.jpeg',9),(27,'Spaghetti Pesto','Pesto Genovese',6,'Spaghetti Pesto_1592270912544_7.jpeg',4),(28,'Café solo','Recién molido',1,'Café solo_1592270973144_7.jpeg',9),(29,'Natillas','Caseras',3,'Natillas_1592270996280_7.jpeg',8),(30,'Cheesecake','Cremosa tarta de queso',4,'Cheesecake_1592271021270_7.jpeg',8),(31,'Tiramisú','No necesita presentación',4,'Tiramisú_1592271060321_7.jpeg',8);
/*!40000 ALTER TABLE `Platos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PlatosCarta`
--

DROP TABLE IF EXISTS `PlatosCarta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PlatosCarta` (
  `id_plato` int NOT NULL,
  `id_carta` int NOT NULL,
  PRIMARY KEY (`id_plato`,`id_carta`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PlatosCarta`
--

LOCK TABLES `PlatosCarta` WRITE;
/*!40000 ALTER TABLE `PlatosCarta` DISABLE KEYS */;
INSERT INTO `PlatosCarta` VALUES (1,1),(1,2),(1,3),(1,4),(1,5),(1,6),(1,7),(1,8),(1,9),(1,10),(2,1),(2,2),(2,3),(2,4),(2,5),(2,6),(2,7),(2,8),(2,9),(2,10),(3,13),(3,14),(4,14),(5,14),(6,14),(7,14),(8,12),(8,14),(9,14),(10,13),(10,14),(11,12),(11,14),(12,14),(13,12),(13,13),(13,14),(14,14),(15,12),(15,13),(15,14),(16,12),(16,14),(17,13),(17,14),(18,12),(18,13),(18,14),(19,12),(19,13),(19,14),(20,12),(20,14),(21,12),(21,14),(22,13),(22,14),(23,14),(24,14),(25,14),(26,12),(26,13),(26,14),(27,14),(28,12),(28,13),(28,14),(29,14),(30,13),(30,14),(31,14);
/*!40000 ALTER TABLE `PlatosCarta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PlatosComandas`
--

DROP TABLE IF EXISTS `PlatosComandas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PlatosComandas` (
  `id_plato` int NOT NULL,
  `id_comanda` int NOT NULL,
  `cantidad` float DEFAULT NULL,
  PRIMARY KEY (`id_plato`,`id_comanda`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PlatosComandas`
--

LOCK TABLES `PlatosComandas` WRITE;
/*!40000 ALTER TABLE `PlatosComandas` DISABLE KEYS */;
/*!40000 ALTER TABLE `PlatosComandas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PlatosPersonal`
--

DROP TABLE IF EXISTS `PlatosPersonal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PlatosPersonal` (
  `id_plato` int NOT NULL,
  `id_personal` int NOT NULL,
  PRIMARY KEY (`id_plato`,`id_personal`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PlatosPersonal`
--

LOCK TABLES `PlatosPersonal` WRITE;
/*!40000 ALTER TABLE `PlatosPersonal` DISABLE KEYS */;
INSERT INTO `PlatosPersonal` VALUES (1,1),(2,1),(3,7),(4,7),(5,7),(6,7),(7,7),(8,7),(9,7),(10,7),(11,7),(12,7),(13,7),(14,7),(15,7),(16,7),(17,7),(18,7),(19,7),(20,7),(21,7),(22,7),(23,7),(24,7),(25,7),(26,7),(27,7),(28,7),(29,7),(30,7),(31,7);
/*!40000 ALTER TABLE `PlatosPersonal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Sesion`
--

DROP TABLE IF EXISTS `Sesion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Sesion` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_cliente` int NOT NULL,
  `id_mesa` int NOT NULL,
  `fecha` date DEFAULT NULL,
  PRIMARY KEY (`id`,`id_cliente`,`id_mesa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Sesion`
--

LOCK TABLES `Sesion` WRITE;
/*!40000 ALTER TABLE `Sesion` DISABLE KEYS */;
/*!40000 ALTER TABLE `Sesion` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-16  4:02:11
