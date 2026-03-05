CREATE DATABASE productmanager
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE productmanager;

CREATE TABLE product(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    price int NOT NULL,
    category VARCHAR(255) NULL,
    PRIMARY KEY (id)
)ENGINE=InnoDB;