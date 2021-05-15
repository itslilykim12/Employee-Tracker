USE tracker;

INSERT INTO department 
(name)
VALUES 
('Sales'),
('Human Resources'),
('IT'),  
('Security'),
('Finance'), 
('Development');

 INSERT INTO role (title, salary, department_id)
 VALUES 
('Software Web Developer',90000, 1),
('Manager', 80000, 2),
('Sales Rep', 45000, 3),
('Engineer', 90000, 4),
('Accountant',75000, 5),
('Security Guard', 60000, 6);

INSERT INTO employee 
(first_name, last_name, role_id, manager_id)
 VALUES 
('Nick', 'Smith', 1, 456),
('Hannah', 'Young', 2, 101),
('Madison', 'Barrett', 3, 225),
('Bella', 'Martins', 4, 348),
('Maria', 'Lopez', 5, 222),
('Josh', 'Hall', 6, 990);