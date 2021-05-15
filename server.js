const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
//connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Summer12@',
    database: 'tracker'
});
//Connects to sql server and database
connection.connect(function(err){
    if (err) throw err; 
    options();
});

//prompts users with the lists of options to choose from 
function options() { 
    inquirer.prompt({
        name: 'action',
        type: ' list',
        message: 'Welcome to our employee tracker database! What would you like to do?',
        choices: [
            'View all employees',
            'View all departments',
            'View all roles',
            'Add an employee',
            'Add a department',
            'Add a role',
            'Update an employee role',
            'Delete an employee',
            'EXIT/QUIT'
        ]
    }).then(function(answer) {
        switch (answer.action) {
        case 'View all employees': viewEmployees();
        break;
        case 'View all departments': viewDepartments();
        break;
        case 'View all roles': viewRoles();
        break;
        case 'Add an employee': addEmployee();
        break;
        case 'Add a department': addDepartment();
        break;
        case 'Add a role': addRole();
        break;
        case 'Update an employee role': updateRole();
        break;
        case 'Delete an employee': deleteEmployee();
        break;
        case 'EXIT/QUIT': exitApp();
        break;
        default:
            break;
        }
    })
};


