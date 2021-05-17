DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS department;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE roles (
     id INT NOT NULL AUTO_INCREMENT,
     title VARCHAR(30) NOT NULL,
     salary DECIMAL NOT NULL,
     department_id INT,
     PRIMARY KEY (id),
     FOREIGN KEY (department_id) REFERENCES department(id)
     );

     CREATE TABLE employee (
     id INT NOT NULL AUTO_INCREMENT,
     first_name VARCHAR(30) NOT NULL,
     last_name VARCHAR(30) NOT NULL,
     roles_id INTEGER,
     manager_id INTEGER,
     PRIMARY KEY (id),
     FOREIGN KEY (roles_id) REFERENCES roles (id),
     FOREIGN KEY(manager_id) REFERENCES employee (id)
    );
