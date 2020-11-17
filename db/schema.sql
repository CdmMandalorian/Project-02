CREATE DATABASE wildlife_db;

USE wildlife_db;

CREATE TABLE IF NOT EXISTS `users` (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  userName varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  createdAt datetime,
  updatedAt datetime
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `animals` (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  animal_species varchar(255) NOT NULL,
  longitude varchar(255) NOT NULL,
  latitude varchar(255) NOT NULL,
  hostile boolean default false,
  foundByUser varchar(255) NOT NULL,
  note varchar(255),
  picture varchar(255),
  createdAt datetime,
  updatedAt datetime
) ENGINE=InnoDB DEFAULT CHARSET=utf8;