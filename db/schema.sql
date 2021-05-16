DROP DATABASE IF EXISTS tracker;

CREATE DATABASE tracker; 

USE tracker;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE role (
     id INT NOT NULL AUTO_INCREMENT,
     title VARCHAR(30) NOT NULL,
     salary DECIMAL NOT NULL,
     department_id INT NOT NULL,
     PRIMARY KEY(id),
     FOREIGN KEY (deparment_id) REFERENCES department(id)
     );

     CREATE TABLE employee (
     id INT NOT NULL AUTO_INCREMENT,
     first_name VARCHAR(30) NOT NULL,
     last_name VARCHAR(30) NOT NULL,
     role_id INT NOT NULL,
     manager_id INT NULL,
     PRIMARY KEY(id),
     FOREIGN KEY(role_id) REFERENCES role(id),
     FOREIGN KEY(manager_id) REFERENCES employee(id)
    );