-- MySQL dump 10.13  Distrib 8.0.1-dmr, for Linux (x86_64)

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `SENSOR_DEMO` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `SENSOR_DEMO`;

--
-- Table structure for table `sensors`
--

DROP TABLE IF EXISTS `sensors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sensors` (
  `UUID` char(15) NOT NULL,
  `INCREMENT_TIME` int(11) NOT NULL,
  `TEMP` int(11) NOT NULL,
  `VOLTS` int(11) NOT NULL,
  `AMPS` real NOT NULL,
  `TIME_THRESHOLD` int(11) NOT NULL,
  `TEMP_THRESHOLD` int(11) NOT NULL,
  `VOLTS_THRESHOLD` int(11) NOT NULL,
  `AMPS_THRESHOLD` real NOT NULL,
  `LAST_PING` datetime DEFAULT NULL,
  PRIMARY KEY (`UUID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sensors`
--

LOCK TABLES `sensors` WRITE;
/*!40000 ALTER TABLE `sensors` DISABLE KEYS */;
INSERT INTO `sensors` VALUES ('1493080233525',10000, 85, 120, 1.3 , 1000, 100, 100, 100, NULL),('2986160467050', 30000, 75, 120, 2.5, 1000, 100, 100, 100, NULL);
/*!40000 ALTER TABLE `sensors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `events` (
  `uuid` char(15) DEFAULT NULL,
  `timestamp` datetime DEFAULT NULL,
  `TEMP` int(11) DEFAULT NULL,
  `VOLTS` int(11) DEFAULT NULL,
  `AMPS` int(11) DEFAULT NULL,
  KEY `uuid` (`uuid`),
  CONSTRAINT `events_ibfk_1` FOREIGN KEY (`uuid`) REFERENCES `sensors` (`UUID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;



-- Dump completed on 2017-04-25  1:56:38
