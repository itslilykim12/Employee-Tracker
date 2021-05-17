const inquirer = require('inquirer');
const db = require('./db/connection');
const consoleTable = require('console.table');

function options () { 
    //Prompts users to choose an option
    inquirer.prompt([
        {
        type: 'list',
        message: 'What would you like to do?',
        name: 'options',
        choices: [
        'View all employees',
        'View all departments',
        'View all roles',
        'Add an employee',
        'Add a department',
        'Add a role',
        'Update an employee role',
        'Delete an employee',
        'EXIT'
        ]
    }
]).then(answer => {
        switch (answer.options) {
            case 'View all employees': 
                viewEmployees();
                 break;
            case 'View all departments': 
                viewDepartments();
                break;
             case 'View all roles': 
                viewRoles();
                break;
            case 'Add an employee':
                 addEmployee();
                break;
            case 'Add a department':
                 addDepartment();
                break;
            case 'Add a role': 
                addRole();
                break;
            case 'Update an employee role':
                 updateRole();
                break;
            case 'Delete an employee': 
            deleteEmployee();
                break;
            case 'EXIT':
                exitApp (); 
                break; 

                default: 
                connection.end();
        
        }
    });
}
//view all employees database
function viewEmployees() {
    var query = 'SELECT * FROM employee';
    connection.query(query, function(err, res){
        if (err) throw err;
        console.log(res.length + 'employees found!');
        console.table('All employees:', res);
        options();
    })
};

//View all departments in the database
function viewDepartments() {
    var query = 'SELECT * FROM department'
    connection.query(query, function (err, res){
        if (err) throw err;
        console.table('All departments:', res);
        options();
    }) 
};
      
//View all roles in the database
function viewRoles () {
    var query = 'SELECT * FROM roles';
    connection.query(query, function(err, res){
        if (err) throw err; 
        console.table('All roles:', res);
        options();
    })
};
 
//add an employee to the database 
function addEmployee() {
    var query = 'SELECT * FROM roles';
    connection.query(query, function (err, res){
        if (err) throw err;
        inquirer.prompt ([
            {
                name: 'first_name',
                type: 'input',
                message: "What is the employee's first name?",
            },
            {
                name: 'last_name',
                type: 'input',
                message:"What is the employee's last name?",
            },
            {
                name: 'manager_id',
                type: 'input',
                message: "What is the employee's manager's ID?",
            },
            {
                name: 'roles',
                type: 'list',
                choices: function() {
                    var roleArray = [];
                    for (let i = 0; i < res.length; i++) {
                        roleArray.push(res[i].title);
                    }
                    return roleArray;
                },
                message: "What is the employee's role?",
            }
        ]).then(function(answer) {
            let roles_id;
            for(let a = 0; a <res.length; a++) {
                if (res[a].title == answer.roles) {
                    roles_id = res[a].id;
                    console.log(roles_id)
                }
            }
            connection.query('INSERT INTO employee SET ?', 
            {
                first_name: answer.first_name,
                last_name: answer.last_name,
                manager_id: answer.manager_id,
                roles_id: roles_id
            },
            function (err) {
                if (err) throw err;
                console.log('Your employee has been added!');
                options();
            })
        })
    })
   
};

//add a Role 
function addRole() {}
 
    
//add department 
function addDepartment () {
  
}
//Update an employee role
function updateRole () {
   
     
      
     
}
//Delete an employee from database
function deleteEmployee () {}
 
    
//Start server after DB connection 
db.connect(err => {
    if (err) throw err;
    console.log('Database Connected')
});

//initialize app 
options();