-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 01. Nov 2023 um 22:07
-- Server-Version: 10.4.28-MariaDB
-- PHP-Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `verification`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `verification`
--

CREATE TABLE `verification` (
  `username` varchar(255) NOT NULL,
  `discordid` varchar(255) NOT NULL,
  `verified` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `verification`
--

INSERT INTO `verification` (`username`, `discordid`, `verified`, `email`) VALUES
('arda.xyz', '848248238866825246', '1', 'arday2008@icloud.com');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `verification`
--
ALTER TABLE `verification`
  ADD UNIQUE KEY `username` (`username`,`discordid`,`verified`,`email`) USING HASH;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
