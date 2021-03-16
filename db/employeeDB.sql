DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB;

USE employeeDB;

CREATE TABLE department (
    id INT UNSIGNED AUTO_INCREMENT ,
    name VARCHAR(30) UNIQUE NOT NULL,
    PRIMARY KEY (id)              

);

CREATE TABLE role (
    id INT UNSIGNED AUTO_INCREMENT,
    title VARCHAR(30) UNIQUE NOT NULL ,
    salary INT UNSIGNED NOT NULL,
    department_id INT UNSIGNED NOT NULL,
    Index department_id (department_id)
    PRIMARY KEY (id)   
);

CREATE TABLE employee (
    id INT UNSIGNED AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT UNSIGNED NOT NULL ,
    Index role_id (role_id), 
    manager_id INT UNSIGNED,
    Index manager_id (manager_id)
    PRIMARY KEY (id)   

    -- foreign key references cascade (line14, 24 & 26)---- LOOK UP -- something along the lines of tying all the tables together
    -- will also have to do this in the role table as well
);

