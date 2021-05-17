const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');
const { connect } = require('./db/connection');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Summer12@',
    database: 'tracker',
});
connection.connect();

function options() { 
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
};
//View all departments in the database
function viewDepartments() {
    const query = 'SELECT * FROM department'
    connection.query(query, (err, res) => {
        if (err) {
            throw err;
        }
        console.table(res);
        options();
    }) 
};
//View all roles in the database
function viewRoles() {
    const query = 'SELECT * FROM roles';
    connection.query(query, (err, res) => {
        if (err){
             throw err; 
        }
        console.table(res);
        options();
    })
};
//view all employees database
function viewEmployees() {
    const query = 'SELECT * FROM employee';
    connection.query(query, (err, res) => {
        if (err) {
            throw err;
        }
        console.table(res)
        options();
    })
};
//add department 
function addDepartment () {
    inquirer.prompt ([
        {
            type:'input',
            name:'department',
            message: 'Please add a department name.'
        }
    ]).then(answer => {
        console.log(answer);
        connection.query('INSERT INTO department SET?', { name: answer.department }, (err, res) => {
            if (err) throw err;
            console.log('Added a new department!')
            options();
        });
    });
}
 //add a Role 
function addRole() {
    console.log('aa');
    //query all the departments
    connection.promise().query('SELECT * FROM department')
    .then((res) => {
        return res [0].map(dept => {
            return {
                name: dept.name,
                value: dept.id
            }
        })
    })
    .then((departments) => {
        return inquirer.prompt([
            {
                type:'input',
                name:'Roles',
                message:'Please add a role.'
            },
            {
                type:'input',
                name:'salary',
                message:'Please enter in a salary.'
            },
            {
                type:'list',
                name:'depts',
                choices: departments,
                message:'please select your department.'
            }
        ])
    })
    .then (answer => {
        console.log(answer);
        return connection.promise().query('INSERT INTO roles SET?', { title: answer.roles, salary: answer.salary, department_id: answer.depts});
    })
    .then(res => {
        console.log("added a new role")
        options();
    })
    .catch(err => {
        throw err
    });
};
//function to select role 
function selectRoles(){
    return connection.promise().query('SELECT * FROM roles')
    .then(res => {
        return res [0].map(roles => {
            return {
                name:roles.title,
                value: roles.id
            }
        })
    })
};

//add an employee to the database 
async function addEmployee() {
    inquirer.prompt([
        {
            name: 'first_name',
            type: 'input',
            message: 'Enter in their first name.'
        },
        {
            name: 'last_name',
            type: 'input',
            message: 'Enter in their last name.'
        },
        {
            name: 'roles',
            type: 'list',
            message: 'What is their role?',
            choices: await selectRoles()
        }
    ]).then(function (res) {
        let rolesId = res.roles
        
        connection.query('INSERT INTO employee SET?', {
            first_name: res.firstname,
            last_name: res.lastname,
            roles_id : rolesId
        }, function (err) {
            if (err) throw err 
            console.table(res)
            options();
        })
    })  
};
//Update an employee role
function updateRole() {
    connection.promise().query('SELECT * FROM employee')
    .then((res) => {
        return res[0].map(employee => {
            return {
                name: employee.first_name,
                value: employee.id
            }
        })
    })
    .then(async(employeeList) => {
        return inquirer.prompt([
            {
                type:'list',
                name:'employeeListId',
                choices: employeeList,
                message: 'Please select the employee, you want to update on.'
            },
            {
                type:'list',
                name: 'rolesId',
                choices: await selectRoles(),
                message:'Please select the role.'
            }
        ])
    })
    .then(answer => {
        console.log(answer);
        return connection.promise().query('UPDATE employee SET roles_id= =? WHERE id = ?', 
        [ 
            answer.rolesID , 
            answer.employeeListId
        ],
        );
    })
    .then(res => {
        console.log('Updated employee successfully!')
        options();
    })
    .catch(err => {
        throw err
    });     
};

//Delete an employee from database
function deleteEmployee() {
    connection.promise().query('SELECT * FROM employee')
    .then ((res) => {
        return res[0].map(emp => {
            return {
                name: emp.first_name,
                value: emp.id
            }
        })
    })
    .then((employees) => {
        return inquirer.prompt([
            {
                type:'list',
                name:'employeeId',
                choices: employees,
                message: 'Please select the employee you want to delete.'
            }
        ])
    })
    .then(answer => {
        console.log(answer);
        return connection.promise().query('DELETE * FROM employee');
    })
    .then(res => {
        console.log("Employee has been deleted successfully")
        options();
    })
    .catch(err => {
        throw err
    });
};
 
//initialize app 
options();