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




