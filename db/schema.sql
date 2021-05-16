DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS department;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE role (
     id INTEGER AUTO_INCREMENT PRIMARY KEY,
     title VARCHAR(30) NOT NULL,
     salary DECIMAL NOT NULL,
     department_id INTEGER,
     CONSTRAINT fk _department FOREIGN KEY (deparment_id) REFERENCES department(id) ON DELETE CASCADE
     );

     CREATE TABLE employee (
     id INTEGER AUTO_INCREMENT PRIMARY KEY,
     first_name VARCHAR(30) NOT NULL,
     last_name VARCHAR(30) NOT NULL,
     role_id INTEGER,
     manager_id INTEGER,
     CONSTRAINT fk_ role FOREIGN KEY(role_id) REFERENCES role(id),
     CONSTRAINT fk _manager FOREIGN KEY(manager_id) REFERENCES employee(id)
    );