-- MySQL Script generated by MySQL Workbench
-- 08/15/16 23:42:04
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
configuration
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
