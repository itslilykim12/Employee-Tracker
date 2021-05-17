const mysql = require('mysql2');

//connect to sql database
const db = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: 'Summer12@',
    database: 'tracker'
});

module.exports = db;