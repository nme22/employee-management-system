DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB;

USE employeeDB;

CREATE TABLE department(
    id INT AUTO_INCREMENT ,
    name VARCHAR(30) UNIQUE NOT NULL,
    PRIMARY KEY (id)              

);

CREATE TABLE roles(
    id INT AUTO_INCREMENT,
    title VARCHAR(30),
    salary decimal(30),
    department_id INT,
    PRIMARY KEY (id)   
);

CREATE TABLE employee(
    id INT AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NULL , 
    manager_id INT(50) NULL,
    PRIMARY KEY (id)   
);

