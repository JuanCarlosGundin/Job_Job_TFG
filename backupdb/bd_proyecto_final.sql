-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: bd_proyecto_final
-- ------------------------------------------------------
-- Server version	8.0.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tbl_chat`
--
CREATE DATABASE bd_proyecto_final;
USE bd_proyecto_final;

DROP TABLE IF EXISTS `tbl_chat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_chat` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_iniciador_chat` int DEFAULT NULL,
  `id_interactuado_chat` int DEFAULT NULL,
  `estado_chat` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `iniciador_usuario_idx` (`id_iniciador_chat`),
  KEY `interactuado_user_idx` (`id_interactuado_chat`),
  CONSTRAINT `iniciador_user` FOREIGN KEY (`id_iniciador_chat`) REFERENCES `tbl_usuarios` (`id`),
  CONSTRAINT `interactuado_user` FOREIGN KEY (`id_interactuado_chat`) REFERENCES `tbl_usuarios` (`id`)
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_chat`
--

LOCK TABLES `tbl_chat` WRITE;
/*!40000 ALTER TABLE `tbl_chat` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_chat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_empresa`
--

DROP TABLE IF EXISTS `tbl_empresa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_empresa` (
  `id_usuario` int NOT NULL,
  `nom_emp` varchar(45) DEFAULT NULL,
  `loc_emp` varchar(45) DEFAULT NULL,
  `about_emp` varchar(45) DEFAULT NULL,
  `campo_emp` varchar(100) DEFAULT NULL,
  `searching` varchar(200) DEFAULT NULL,
  `mostrado` varchar(45) DEFAULT NULL,
  `logo_emp` varchar(100) DEFAULT NULL,
  `vacante` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `logo_emp_UNIQUE` (`logo_emp`),
  CONSTRAINT `empresa_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `tbl_usuarios` (`id`)
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_empresa`
--

LOCK TABLES `tbl_empresa` WRITE;
/*!40000 ALTER TABLE `tbl_empresa` DISABLE KEYS */;
INSERT INTO `tbl_empresa` VALUES (61,'IT Lords','Barcelona','Empresa de IT y desarrollo web e','Web developement','Buscamos a un ingeniero web para conectar nuestros servidores','1','uploads/1PYw9jDyd9OAgZbv8hK1Zzq6Tom9lzcbfKcVKJ2O.jpg','Programador'),(64,'Samsung','Barcelona','Somos una empresa de software movil','Ingenieria de software','Ingenieros','0','uploads/EDCSAIs4ahrDjCqLyUz7o5y8Tw1g06iaRi1ah33B.png','Ingeniero multiplataforma');
/*!40000 ALTER TABLE `tbl_empresa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_interaccion`
--

DROP TABLE IF EXISTS `tbl_interaccion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_interaccion` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_iniciador` int DEFAULT NULL,
  `id_interactuado` int DEFAULT NULL,
  `tipo_interaccion` varchar(45) DEFAULT NULL,
  `estado_interaccion` varchar(45) DEFAULT NULL,
  `coincidencia` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `iniciador_usuario_idx` (`id_iniciador`),
  KEY `interactuado_usuario_idx` (`id_interactuado`),
  CONSTRAINT `iniciador_usuario` FOREIGN KEY (`id_iniciador`) REFERENCES `tbl_usuarios` (`id`),
  CONSTRAINT `interactuado_usuario` FOREIGN KEY (`id_interactuado`) REFERENCES `tbl_usuarios` (`id`)
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_interaccion`
--

LOCK TABLES `tbl_interaccion` WRITE;
/*!40000 ALTER TABLE `tbl_interaccion` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_interaccion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_perfiles`
--

DROP TABLE IF EXISTS `tbl_perfiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_perfiles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom_perfil` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_perfiles`
--

LOCK TABLES `tbl_perfiles` WRITE;
/*!40000 ALTER TABLE `tbl_perfiles` DISABLE KEYS */;
INSERT INTO `tbl_perfiles` VALUES (1,'Admin'),(2,'Trabajador'),(3,'Empresa');
/*!40000 ALTER TABLE `tbl_perfiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_reportes`
--

DROP TABLE IF EXISTS `tbl_reportes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_reportes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_reportador` int DEFAULT NULL,
  `id_reportado` int DEFAULT NULL,
  `incidencia` varchar(200) DEFAULT NULL,
  `estado_incidencia` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `reportador_usuarios_idx` (`id_reportador`),
  KEY `reportado_usuarios_idx` (`id_reportado`),
  CONSTRAINT `reportado_usuarios` FOREIGN KEY (`id_reportado`) REFERENCES `tbl_usuarios` (`id`),
  CONSTRAINT `reportador_usuarios` FOREIGN KEY (`id_reportador`) REFERENCES `tbl_usuarios` (`id`)
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_reportes`
--

LOCK TABLES `tbl_reportes` WRITE;
/*!40000 ALTER TABLE `tbl_reportes` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_reportes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_trabajador`
--

DROP TABLE IF EXISTS `tbl_trabajador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_trabajador` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `apellido` varchar(45) DEFAULT NULL,
  `foto_perfil` varchar(100) DEFAULT NULL,
  `campo_user` varchar(45) DEFAULT NULL,
  `experiencia` varchar(200) DEFAULT NULL,
  `estudios` varchar(200) DEFAULT NULL,
  `idiomas` varchar(200) DEFAULT NULL,
  `disponibilidad` varchar(45) DEFAULT NULL,
  `about_user` varchar(300) DEFAULT NULL,
  `mostrado` varchar(45) DEFAULT NULL,
  `loc_trabajador` varchar(100) DEFAULT NULL,
  `edad` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_usuario`),
  CONSTRAINT `trabajador_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `tbl_usuarios` (`id`)
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_trabajador`
--

LOCK TABLES `tbl_trabajador` WRITE;
/*!40000 ALTER TABLE `tbl_trabajador` DISABLE KEYS */;
INSERT INTO `tbl_trabajador` VALUES (60,'Diego','Soledispa','uploads/ZCZtmMAnmegniZTquMnmPhvo7wi9Za6d1VP3Itqc.png','IT','DAW','DAW','Castellano, Catalán y Ingles','Tiempo completo','ME encanta jugar al monopoli y ver animu','1','Bellvitge, Barcelona','22'),(62,'Juancalo','Guding','uploads/WDFERi3avMoFMjDLWTawDk679brw6sBK9wcWwsKv.jpg','Programador Java','Ninguna','Java','Castellano','Siempre','Me quiero morir','0','ESPAÑA','44'),(63,'Juancaloelcapo','Gundin','uploads/eWeQgmgHjUOIfRtVYA5MlOM28yGSenSJDfxOumln.png','IT','Ninguna','Pocos','Catalán','Siempre','Me quiero morir mucho','0','Barcelona','12');
/*!40000 ALTER TABLE `tbl_trabajador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_usuarios`
--

DROP TABLE IF EXISTS `tbl_usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `mail` varchar(100) DEFAULT NULL,
  `contra` varchar(45) DEFAULT NULL,
  `id_perfil` int DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL,
  `verificado` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_perfil_idx` (`id_perfil`),
  CONSTRAINT `usuario_perfil` FOREIGN KEY (`id_perfil`) REFERENCES `tbl_perfiles` (`id`)
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_usuarios`
--

LOCK TABLES `tbl_usuarios` WRITE;
/*!40000 ALTER TABLE `tbl_usuarios` DISABLE KEYS */;
INSERT INTO `tbl_usuarios` VALUES (1,'Admin@gmail.com','202cb962ac59075b964b07152d234b70',1,'1','1'),(60,'31966.joan23@fje.edu','202cb962ac59075b964b07152d234b70',2,'1','1'),(61,'juancarlosgr9898@gmail.com','202cb962ac59075b964b07152d234b70',3,'1','1'),(62,'elcoco.cococ5@gmail.com','202cb962ac59075b964b07152d234b70',2,'1','0'),(63,'elcoco.coco5@gmail.com','202cb962ac59075b964b07152d234b70',2,'1','1'),(64,'laura.fernandez18062@gmail.com','25d55ad283aa400af464c76d713c07ad',3,'1','1');
/*!40000 ALTER TABLE `tbl_usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-08 22:25:01
