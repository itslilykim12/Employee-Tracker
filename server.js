const inquirer = require('inquirer');
const db = require('./db/connection');
const consoleTable = require('console.table');
const util = require('util');



//connection.query = util.promisify(connection.query);

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
function viewEmployees () {
    connection.query('SELECT * FROM employee',(err, res) => {
        if (err) {
            throw err;
        }
        console.table(res)
        options();
    }) 
};
//View all departments in the database
function viewDepartments () {
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        if (res.length > 0) {
            console.log('\n')
            console.log(' ** Departments**')
            console.log('\n')
            //console.table(res);
        }
        options();
    });
}

//View all roles in the database
function viewRoles () {
    connection.query('SELECT ro.title as role_title, ro.salary as role_salary, dept.name as departmentName from role ro left join department as dept on dept.id = ro.department_id', (err,res) => {
        if (err) {
            throw err;
        }
        //console.table(res)
        options();
    })
   
};
//add an employee to the database 
function addEmployee () {
   
}

//add a Role 
function addRole () {
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
                type: 'input',
                name: 'roles',
                message: 'Please add a role.'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Please enter a salary.'
            },
            {
                type: 'list',
                name: 'depts',
                choices: departments,
                message: ' Please select your department'
            }

        ])
    })
    .then(answer => {
        console.log(answer);
        return connection.promise().query('INSERT INTO role SET?', {title: answer.roles, salary: answer.salary, department_id: answer.depts});
    })
    .then(res => {
        console.log('Added a new role')
        options();
    })
    .catch(err => {
        throw err
    });
}
//add department 
function addDepartment () {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'Please add a department name.'
        }
    ]).then(answer => {
        console.log(answer);
        connection.query('INSERT INTO department SET?', {name: answer.department }, (err, res) => {
            if (err) throw err;
            console.log('Added a new department')
            options();
        });
    });
}
//Update an employee role
function updateRole () {
    connection.promise().query('SELECT * FROM employee')
    .then((res) => {
        return res [0].map(employee => {
            return {
                name: employee.first_name,
                value: employee.id
            }
        })
    })
    .then(async (employeeList) => {
        return inquirer.prompt ([
            {
                type: 'list',
                name: 'employeeListId',
                choices: employeeList,
                message: 'Please select the employee you want to update.'
            },
            {
                type: 'list',
                name: ' roleId',
                choices: await selectRole (), 
                message: ' Please select the role.'
            }
        ])
    })
    .then(answer => {
        console.log(answer);
        return connection.promise().query('UPDATE employee SET role_id=? WHERE id=?', [ answer.roleId, answer.employeeListId,],
         );
    })
    .then(res => {
        console.log('Updated an Employee Successfully.')
        options();
    })
    .catch(err => {
        throw err;
    });
}
//Delete an employee from database
function deleteEmployee () {
    connection.promise().query ('SELECT * FROM employee')
    .then((res) => {
        return res [0].map(dept => {
            return {
                name: emp.first_name,
                value: emp.id
            }
        })
    })
    .then((employees) => {
        return inquirer.prompt([
            {
                type: 'list',
                name: 'employeeId',
                choices: employees,
                message: 'Please select the employee you want to delete.'
            }
        ])
    })
    .then(res => {
        console.log('Employee Deleted Successfully.')
        options();
    })
    .catch(err => {
        throw err
    });
};
//Start server after DB connection 
db.connect(err => {
    if (err) throw err;
    console.log('Database Connected')
});

//initialize app 
options();