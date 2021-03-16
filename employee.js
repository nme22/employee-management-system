const mysql = require('mysql');
const inquirer = require('inquirer');
const connection = require('./connection');

function runSearch() {
    inquirer.prompt([{
        type: 'list',
        name: 'userChoice',
        message: 'What would you like to search?',
        choices: [
            "Add a department",
            "Add a role",
            "Add a employee",
            "View a department",
            "View a role",
            "View an employee",
            "Update an employee role"
        ]
    }]).then((answer) => {
        // Create a switch case for what the user wants to do with the database
        switch (answer.userChoice) {
            case "Add a department":
                addDepartment();
                break;
            case "Add a role":
                addRole();
                break;
            case "Add an employee":
                addEmployee();
                break;
            case "View a department":
                viewDepartment();
                break;
            case "View roles":
                viewRoles();
                break;
            case "View employees":
                viewEmployee();
                break;
            case "Update an employee role":
                updateEmployeeRole();
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
}​