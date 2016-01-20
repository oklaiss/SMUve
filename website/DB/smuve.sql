-- MySQL dump 10.13  Distrib 5.5.46, for debian-linux-gnu (i686)
--
-- Host: localhost    Database: smuve
-- ------------------------------------------------------
-- Server version	5.5.46-0ubuntu0.14.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Driver`
--

DROP TABLE IF EXISTS `Driver`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Driver` (
  `userID` int(11) NOT NULL,
  `vehicle_name` varchar(30) DEFAULT NULL,
  `vehicle_year` varchar(6) DEFAULT NULL,
  `hasStorage` tinyint(1) DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `phoneNum` varchar(15) DEFAULT NULL,
  `ror` tinyint(1) DEFAULT NULL,
  `extraInfo` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Driver`
--

LOCK TABLES `Driver` WRITE;
/*!40000 ALTER TABLE `Driver` DISABLE KEYS */;
INSERT INTO `Driver` VALUES (2,'SWAGGY WAGGY','12341',0,1,'231241131',1,'too dank');
/*!40000 ALTER TABLE `Driver` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Image_urls`
--

DROP TABLE IF EXISTS `Image_urls`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Image_urls` (
  `postID` int(20) NOT NULL,
  `image_url` varchar(10000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Image_urls`
--

LOCK TABLES `Image_urls` WRITE;
/*!40000 ALTER TABLE `Image_urls` DISABLE KEYS */;
INSERT INTO `Image_urls` VALUES (7,'http://res.cloudinary.com/smuve-smu-undergraduate-project/image/upload/v1448387057/hon4laa1r6ny1tiusigu.png'),(8,'http://res.cloudinary.com/smuve-smu-undergraduate-project/image/upload/v1448387398/onk2zxcdimkk8dfk7wam.png'),(9,'http://res.cloudinary.com/smuve-smu-undergraduate-project/image/upload/v1448387398/onk2zxcdimkk8dfk7wam.png'),(10,'http://res.cloudinary.com/smuve-smu-undergraduate-project/image/upload/v1448387398/onk2zxcdimkk8dfk7wam.png'),(11,'http://res.cloudinary.com/smuve-smu-undergraduate-project/image/upload/v1448387398/onk2zxcdimkk8dfk7wam.png'),(12,'http://res.cloudinary.com/smuve-smu-undergraduate-project/image/upload/v1448910863/hf8cv3yl5ogmdassblym.jpg'),(13,'http://res.cloudinary.com/smuve-smu-undergraduate-project/image/upload/v1449190058/uv8npnnttl1drwrmt5ee.png'),(14,'http://res.cloudinary.com/smuve-smu-undergraduate-project/image/upload/v1449190058/uv8npnnttl1drwrmt5ee.png'),(15,'http://res.cloudinary.com/smuve-smu-undergraduate-project/image/upload/v1449190058/uv8npnnttl1drwrmt5ee.png'),(16,'http://res.cloudinary.com/smuve-smu-undergraduate-project/image/upload/v1449190058/uv8npnnttl1drwrmt5ee.png'),(16,'http://res.cloudinary.com/smuve-smu-undergraduate-project/image/upload/v1449190061/eic03fvfgmahrnjmgcpc.png'),(16,'http://res.cloudinary.com/smuve-smu-undergraduate-project/image/upload/v1449190063/oqugy5odvnzvarwgpklk.png');
/*!40000 ALTER TABLE `Image_urls` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Liked_posts`
--

DROP TABLE IF EXISTS `Liked_posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Liked_posts` (
  `userID` int(11) DEFAULT NULL,
  `postID` int(20) DEFAULT NULL,
  KEY `fk_user_ID` (`userID`),
  KEY `fk_post_ID` (`postID`),
  CONSTRAINT `fk_post_ID` FOREIGN KEY (`postID`) REFERENCES `Posts` (`postID`),
  CONSTRAINT `fk_user_ID` FOREIGN KEY (`userID`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Liked_posts`
--

LOCK TABLES `Liked_posts` WRITE;
/*!40000 ALTER TABLE `Liked_posts` DISABLE KEYS */;
/*!40000 ALTER TABLE `Liked_posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Posts`
--

DROP TABLE IF EXISTS `Posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Posts` (
  `postID` int(20) NOT NULL AUTO_INCREMENT,
  `id` int(11) NOT NULL,
  `conditionOf` varchar(30) NOT NULL,
  `category` varchar(30) NOT NULL,
  `title` varchar(50) NOT NULL,
  `description` varchar(200) NOT NULL,
  `price` double(9,2) NOT NULL,
  `transactionID` int(20) DEFAULT NULL,
  `active` tinyint(1) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `numLikes` int(11) DEFAULT NULL,
  PRIMARY KEY (`postID`,`id`),
  KEY `fk_id` (`id`),
  CONSTRAINT `Posts_ibfk_2` FOREIGN KEY (`id`) REFERENCES `Users` (`id`),
  CONSTRAINT `fk_id` FOREIGN KEY (`id`) REFERENCES `Users` (`id`),
  CONSTRAINT `Posts_ibfk_1` FOREIGN KEY (`id`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Posts`
--

LOCK TABLES `Posts` WRITE;
/*!40000 ALTER TABLE `Posts` DISABLE KEYS */;
INSERT INTO `Posts` VALUES (3,2,'0','0','s;fks;l','lkdjflksjlkdsf',12.00,NULL,1,'0000-00-00 00:00:00',NULL),(4,2,'0','0','Post 1','This is an item that I want to sell to some people',15.00,NULL,1,'2015-11-24 17:32:35',NULL),(5,2,'0','0','Post 1','This is an item that I want to sell to some people',15.00,NULL,1,'2015-11-24 17:32:46',NULL),(6,2,'0','0','Post 1','This is an item that I want to sell to some people',15.00,NULL,1,'2015-11-24 17:34:01',NULL),(7,2,'0','0','Hello','This is a new listing here',12.00,NULL,1,'2015-11-24 17:48:19',NULL),(8,2,'0','0','Title 1 ','This is a title that will contain multiple images. Will it work??',13.00,NULL,1,'2015-11-24 17:50:07',NULL),(9,2,'0','0','Title 1 ','This is a title that will contain multiple images. Will it work??',13.00,NULL,1,'2015-11-24 17:50:14',NULL),(10,2,'0','0','Title 1 ','This is a title that will contain multiple images. Will it work??',13.00,NULL,1,'2015-11-24 17:51:41',NULL),(11,2,'0','0','Title 1 ','This is a title that will contain multiple images. Will it work??',13.00,NULL,1,'2015-11-24 17:54:47',NULL),(12,2,'0','0','Kittens','Everyone loves cats!',69.00,NULL,1,'2015-11-30 19:14:32',NULL),(13,2,'FILL VALUE','Bathroom','dogs','I hate cats, here is a dog for sale',100.00,NULL,1,'2015-12-04 00:47:45',NULL),(14,2,'FILL VALUE','Bathroom','dogs','I hate cats, here is a dog for sale',100.00,NULL,1,'2015-12-04 00:48:10',NULL),(15,2,'FILL VALUE','Bathroom','dogs','I hate cats, here is a dog for sale',100.00,NULL,1,'2015-12-04 00:49:37',NULL),(16,2,'FILL VALUE','Bathroom','dogs','I hate cats, here is a dog for sale',100.00,NULL,1,'2015-12-04 00:52:05',NULL);
/*!40000 ALTER TABLE `Posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Transactions`
--

DROP TABLE IF EXISTS `Transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Transactions` (
  `transactionID` int(20) NOT NULL DEFAULT '0',
  `sellerID` int(20) DEFAULT NULL,
  `buyerID` int(20) DEFAULT NULL,
  `review` double(3,2) DEFAULT NULL,
  `item` tinyint(1) NOT NULL,
  `service` tinyint(1) NOT NULL,
  PRIMARY KEY (`transactionID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Transactions`
--

LOCK TABLES `Transactions` WRITE;
/*!40000 ALTER TABLE `Transactions` DISABLE KEYS */;
/*!40000 ALTER TABLE `Transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(20) NOT NULL,
  `rep` double(3,2) DEFAULT NULL,
  `zip` int(5) NOT NULL,
  `state` varchar(25) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'Christian','Green','cmgreen@smu.edu','password',NULL,75205,'Texas'),(2,'avery','ferrante','aferrante@smu.edu','password',NULL,83772,'OK');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-12-10  6:21:22
