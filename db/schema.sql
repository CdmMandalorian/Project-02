DROP DATABASE IF EXISTS wildlife_db;

CREATE DATABASE wildlife_db;

USE wildlife_db;

CREATE TABLE wildlife
(
	id int NOT NULL AUTO_INCREMENT,
	animal_name VARCHAR(50) NOT NULL,
    animal_species VARCHAR(15) NOT NULL,
    longitude FLOAT NOT NULL,
    latitude FLOAT NOT NULL,
    color VARCHAR(50) NOT NULL,
    time_found VARCHAR(50),
    hostile BOOLEAN,
    picture VARCHAR(1000),
    note VARCHAR(50),
	PRIMARY KEY (id)
);

CREATE TABLE user
(
    id int NOT NULL AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(18) NOT NULL,
    date_created varchar(12) NOT NULL,
    PRIMARY KEY (id)
);