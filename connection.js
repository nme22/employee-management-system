const mysql = require('mysql');
const util = require('util');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employeeDB'
});

connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    runSearch();
})
connection.connect();
connection.query = util.promisify(connection.query);


module.exports = connection;