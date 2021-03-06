-- MySQL Script generated by MySQL Workbench
-- 08/21/16 01:43:39
-- Model: New Model    Version: 1.0
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema lavendimia
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `lavendimia` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `lavendimia` ;

-- -----------------------------------------------------
-- Table `lavendimia`.`configuration`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lavendimia`.`configuration` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `rate` DECIMAL(16,6) NOT NULL,
  `hitch` DECIMAL(16,6) NOT NULL,
  `deadline` DECIMAL(16,6) NOT NULL,
  `updatedAt` DATETIME NULL,
  `createdAt` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `lavendimia`.`client`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lavendimia`.`client` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `mother_last_name` VARCHAR(45) NOT NULL,
  `rfc` VARCHAR(13) NOT NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `lavendimia`.`article`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lavendimia`.`article` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(100) NOT NULL,
  `model` VARCHAR(45) NOT NULL,
  `price` DECIMAL(16,6) NOT NULL,
  `existence` INT NOT NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `lavendimia`.`sale`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lavendimia`.`sale` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `client_id` INT NOT NULL,
  `total` DECIMAL(16,6) NOT NULL,
  `date` DATETIME NOT NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
