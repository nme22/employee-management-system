const mysql = require('mysql');
const util = require('util');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employeeDB'
});

function runSearch() {
    inquirer.prompt([{
        type: 'list',
        name: 'userChoice',
        message: 'What would you like to search?',
        choices: [
            "Add a department, role, or employee",
            "View a department, role, or employee",
            "Update a department, role, or employee",
        ]
    }]).then((answer) => {
        // Create a switch case for what the user wants to do with the database
        switch (answer.userChoice) {
            case "Department":
                queryAdd();
                break;
            case "role":
                queryView();
                break;
            case "employee":
                queryUpdate();
                break;
        }
    });
}​


function queryAdd() {
    inquirer.prompt({
            type: 'list',
            name: 'userAdd',
            message: 'What would you like to add to the database?',
            choices: [
                "Add a department",
                "Add an role",
                "Add an employee",
            ]
        })
        .then((answer) => {
            // Create a switch case for what the user wants to add
            switch (answer.userChoice) {
                case "Department":
                    let query = 'INSERT INTO Departments (name) VALUES (${})';
                    connection.query(query, (err, results) => {
                        if (err) throw err;
                        console.log(results);
                        runSearch();
                    });
                    break;
                case "role":
                    queryAddRole();
                    break;
                case "employee":
                    queryAddEmployee();
                    break;
            }
        })

}​


function queryView() {
    inquirer.prompt({
            type: 'list',
            name: 'userView',
            message: 'What would you like to view from the database?',
            choices: [
                "View a department",
                "View a role",
                "View an employee",
            ]
        })
        .then((answer) => {
            switch (answer.userView) {
                case "View a department":
                    let query = 'SELECT * FROM Departments';
                    connection.query(query, (err, results) => {
                        if (err) throw err;
                        console.log(results);
                        runSearch();
                    });
                    break;
                case "View a role":
                    let query = 'SELECT * FROM role';
                    connection.query(query, (err, results) => {
                        if (err) throw err;
                        console.log(results);
                        runSearch();
                    });

                    break;
                case "View a employee":
                    queryAddEmployee();
                    break;
            }


        });

    // connection.query(query, (err, results) => {
    //     if (err) throw err;
    //     console.log(results);
    //     runSearch();




}​



connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    runSearch();
})
connection.connect();
connection.query = util.promisify(connection.query);


module.exports = connection;