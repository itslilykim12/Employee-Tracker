const mysql = require('mysql2'); 

//connect to the database
const db = mysql.createConnection(
    {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'Summer12@',
        database: 'tracker',
    },
    console.log('Connected to tracker database')
);
module.exports = db;