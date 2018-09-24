DROP DATABASE IF EXISTS store_db;
CREATE DATABASE store_db;

USE store_db;

CREATE TABLE products
(
     id int NOT NULL AUTO_INCREMENT,
     product_name varchar(255) NOT NULL,
     description varchar(255) NOT NULL,
     url varchar(1000) NOT NULL,
     department varchar(255) NOT NULL,
     price decimal (10,2) NOT NULL,
     quantity int NOT NULL,
     PRIMARY KEY(id)   

);
     

CREATE TABLE users
(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    username varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    phone varchar(15) NOT NULL,
    PRIMARY KEY(id)
 );