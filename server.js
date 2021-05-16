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
    console.log("\n Welcome to Employee Tracker Database!\n")
    options();
});

//Main options function ()
function options () { 
    //Prompts users to choose an option
    inquirer.prompt(
        {
        type: ' list',
        message: 'What would you like to do?',
        name: 'option',
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
    }).then((answer) => {
        //switch case depending on user option
        switch (answer.option) {
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
        case 'EXIT/QUIT':connection.end();
        console.log('Have a good day!')
        break;
        
        }
    })
}
//view all employees database
function viewEmployees () {
   
};
//View all departments in the database
function viewDepartments () {
   
};

//View all roles in the database
function viewRoles () {
   
};
//add an employee to the database 
function addEmployee () {
   
}

//add a Role 
function addRole () {};
//add department 
function addDepartment () {};
//Update an employee role
function updateRole () {};
//Delete an employee from database
function deleteEmployee () {};