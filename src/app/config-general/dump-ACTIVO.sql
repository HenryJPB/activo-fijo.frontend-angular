-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 172.17.0.3
-- Tiempo de generación: 24-08-2023 a las 18:44:08
-- Versión del servidor: 8.0.33
-- Versión de PHP: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ACTIVO`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `activo_dat`
--

CREATE TABLE `activo_dat` (
  `codigo_activo` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `descripcion` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `codigo_ubic` varchar(255) DEFAULT NULL,
  `imagen` tinyblob,
  `nro_compra` varchar(255) DEFAULT NULL,
  `marca` varchar(255) DEFAULT NULL,
  `modelo` varchar(255) DEFAULT NULL,
  `serial` varchar(255) DEFAULT NULL,
  `vida_util` tinyint DEFAULT '0',
  `valor_inicial` float DEFAULT NULL,
  `valor_rescate` float DEFAULT NULL,
  `valor_libro` float DEFAULT NULL,
  `depre_anual` float DEFAULT NULL,
  `depre_acum` float DEFAULT NULL,
  `observacion` varchar(255) DEFAULT NULL,
  `desincorporado` tinyint DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `activo_dat`
--

INSERT INTO `activo_dat` (`codigo_activo`, `descripcion`, `codigo_ubic`, `imagen`, `nro_compra`, `marca`, `modelo`, `serial`, `vida_util`, `valor_inicial`, `valor_rescate`, `valor_libro`, `depre_anual`, `depre_acum`, `observacion`, `desincorporado`) VALUES
('LAP-INF-01', 'LAPTOP COMPAQ \'Presario\'', 'INFORMATICA', NULL, '0019920119*', 'COMPAQ', 'PRESARIO', 'IBM00000000CP', 0, 0, 0, 0, 0, 0, NULL, 0),
('PC-INF-01', 'COMPUTADORA PERSONAL GENERICO TIPO DESKTOP. COLOR NEGRO. CAGE DE NOMBRE \'AITEG\'. ', 'INFORMATICA', NULL, '20111231', 'S/M', 'GENERICO', 'S/S', 0, 0, 0, 0, 0, 0, NULL, 0),
('PC-VEN-01', 'COMPUTADOR GENERICO COLOR NEGRO. c/Windows 10 Pro', 'VENTAS', NULL, 'S/N', 'S/M', 'GENERICO', 'S/S', 0, 0, 0, 0, 0, 0, NULL, 0),
('VIB-SAL-01', 'VIDEO BEAM ', 'ADMINISTRACION', NULL, 'S/N', 'EPSON', 'S/M', '11223344556677', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `adicion_dat`
--

CREATE TABLE `adicion_dat` (
  `codigo_activo` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `fecha` date NOT NULL,
  `descripcion1` varchar(100) DEFAULT NULL,
  `descripcion2` varchar(100) DEFAULT NULL,
  `descripcion3` varchar(100) DEFAULT NULL,
  `descripcion4` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `articulo_dat`
--

CREATE TABLE `articulo_dat` (
  `codigo_articulo` varchar(10) NOT NULL,
  `codigo_ubic` varchar(255) DEFAULT NULL,
  `descripcion` varchar(100) NOT NULL,
  `imagen` tinyblob,
  `nro_compra` varchar(255) DEFAULT NULL,
  `marca` varchar(255) DEFAULT NULL,
  `modelo` varchar(255) DEFAULT NULL,
  `serial` varchar(255) DEFAULT NULL,
  `vida_util` tinyint DEFAULT '0',
  `valor_inicial` float DEFAULT NULL,
  `valor_rescate` float DEFAULT NULL,
  `valor_libro` float DEFAULT NULL,
  `depre_anual` float DEFAULT NULL,
  `depre_acum` float DEFAULT NULL,
  `desincorporado` tinyint DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `articulo_dat`
--

INSERT INTO `articulo_dat` (`codigo_articulo`, `codigo_ubic`, `descripcion`, `imagen`, `nro_compra`, `marca`, `modelo`, `serial`, `vida_util`, `valor_inicial`, `valor_rescate`, `valor_libro`, `depre_anual`, `depre_acum`, `desincorporado`) VALUES
('LAP-INF-01', 'INFORMATICA', 'LAPTOP COMPAQ \'Presario\'', NULL, '0019920119*', 'COMPAQ', 'PRESARIO', 'IBM00000000CP', 0, 0, 0, 0, 0, 0, 0),
('PC-INF-01', 'INFORMATICA', 'COMPUTADORA PERSONAL GENERICO TIPO DESKTOP. COLOR NEGRO. CAGE DE NOMBRE \'AITEG\'. ', NULL, '20111231', 'S/M', 'GENERICO', 'S/S', 0, 0, 0, 0, 0, 0, 0),
('PC-VEN-01', 'VENTAS', 'COMPUTADOR GENERICO COLOR NEGRO. c/Windows 10 Pro', NULL, 'S/N', 'S/M', 'GENERICO', 'S/S', 0, 0, 0, 0, 0, 0, 0),
('VIB-SAL-01', 'ADMINISTRACION', 'VIDEO BEAM ', NULL, 'S/N', 'EPSON', 'S/M', '11223344556677', NULL, NULL, NULL, NULL, NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contacto_dat`
--

CREATE TABLE `contacto_dat` (
  `codigo` int NOT NULL,
  `nombre` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `contacto_dat`
--

INSERT INTO `contacto_dat` (`codigo`, `nombre`) VALUES
(10, 'PRUEBA ARTICULO 10'),
(20, 'PRUEBA ARTICULO 20');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleado_dat`
--

CREATE TABLE `empleado_dat` (
  `id` int UNSIGNED NOT NULL,
  `dni` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `nombre_completo` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(150) NOT NULL,
  `fecha_nac` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `empleado_dat`
--

INSERT INTO `empleado_dat` (`id`, `dni`, `nombre_completo`, `email`, `fecha_nac`) VALUES
(1, '0101', 'HENRY PULGAR', 'hpulgar@gmail.com', '1963-09-26 00:00:00.000000'),
(2, '0102', 'DR CHAPATIN', 'chapatinDr@gmail.com', '1954-01-19 00:00:00.000000'),
(3, '0103', 'DON RAMON CHAVEZ', 'rChavez@psuv.com.ve', '1945-03-31 00:00:00.000000'),
(4, '0104', 'VALDOMIRO CANSADO', 'vValdomiro.cansado@hotmail.com.ve', '1959-08-03 00:00:00.000000');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ubicacion_dat`
--

CREATE TABLE `ubicacion_dat` (
  `codigo_ubic` varchar(255) NOT NULL,
  `descripcion` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `ubicacion_dat`
--

INSERT INTO `ubicacion_dat` (`codigo_ubic`, `descripcion`) VALUES
('ADMINISTRACION', 'SALA DE CONFERENCIA'),
('INFORMATICA', 'DEPARTAMENTO DE INFORMATICA'),
('VENTAS', 'DEPARTAMENTO DE VENTAS');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `activo_dat`
--
ALTER TABLE `activo_dat`
  ADD PRIMARY KEY (`codigo_activo`),
  ADD KEY `codigoUbic` (`codigo_ubic`) USING BTREE;

--
-- Indices de la tabla `adicion_dat`
--
ALTER TABLE `adicion_dat`
  ADD PRIMARY KEY (`codigo_activo`,`fecha`);

--
-- Indices de la tabla `articulo_dat`
--
ALTER TABLE `articulo_dat`
  ADD PRIMARY KEY (`codigo_articulo`),
  ADD KEY `codigoUbic` (`codigo_ubic`) USING BTREE;

--
-- Indices de la tabla `contacto_dat`
--
ALTER TABLE `contacto_dat`
  ADD PRIMARY KEY (`codigo`);

--
-- Indices de la tabla `empleado_dat`
--
ALTER TABLE `empleado_dat`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `dni` (`dni`);

--
-- Indices de la tabla `ubicacion_dat`
--
ALTER TABLE `ubicacion_dat`
  ADD PRIMARY KEY (`codigo_ubic`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `empleado_dat`
--
ALTER TABLE `empleado_dat`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `activo_dat`
--
ALTER TABLE `activo_dat`
  ADD CONSTRAINT `fk_activo_ubicacion` FOREIGN KEY (`codigo_ubic`) REFERENCES `ubicacion_dat` (`codigo_ubic`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Filtros para la tabla `adicion_dat`
--
ALTER TABLE `adicion_dat`
  ADD CONSTRAINT `fk_adicion_articulo` FOREIGN KEY (`codigo_activo`) REFERENCES `activo_dat` (`codigo_activo`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Filtros para la tabla `articulo_dat`
--
ALTER TABLE `articulo_dat`
  ADD CONSTRAINT `fk_articulo_ubicacion` FOREIGN KEY (`codigo_ubic`) REFERENCES `ubicacion_dat` (`codigo_ubic`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
