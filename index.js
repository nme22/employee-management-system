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
            case "Add an employee":
                addEmployee();
                break;
            case "Add a role":
                addRole();
                break;
            case "View a department":
                viewDepartment();
                break;
            case "View role":
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

function addEmployee() {
    console.log('they selected to add employee')
    // ask for employee info 
    inquirer.prompt(
        [{
                type: 'input',
                name: 'first_name',
                message: 'What is the Employees first name?'
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'What is the Employees last name?'
            },
            {
                type: 'list',
                name: 'role',
                message: 'What is the Employees role?',
                choices: [
                    'Accountant',
                    'Developer',
                    'Engineer',
                ]

            },
            {
                type: 'list',
                name: 'manager',
                message: 'Who is the Employees manager?',
                choices: [
                    'Joe Han',
                    'Baba Bazorg',
                    'Will Ferrell'
                ]
            },
        ]
    ).then(answers => {
        // console.log(answers)
        switch (answers.role) {
            case "Accountant":
                answers.role = 1
                break;

            case "Developer":
                answers.role = 2
                break;

            case "Engineer":
                answers.role = 3
                break;
        }

        switch (answers.manager) {
            case "Joe Han":
                answers.manager = 4
                break;

            case "Baba Bazorg":
                answers.manager = 5
                break;

            case "Will Ferrell":
                answers.manager = 6
                break;
        }
        let newEmployee = new Employee(answers.first_name, answers.last_name, answers.role, answers.manager)
        console.table(newEmployee)

        // insert new Employee into mysql
        // 
        connection.query("INSERT INTO employee SET ? ", newEmployee, function (err, res) {
            if (err) throw err;

        })

        runSearch()
        console.log(answers)
        console.log('DONE--->')
    })
}


// function queryAdd() {
//     inquirer.prompt({
//             type: 'list',
//             name: 'userAdd',
//             message: 'What would you like to add to the database?',
//             choices: [
//                 "Add a department",
//                 "Add an role",
//                 "Add an employee",
//             ]
//         })
//         .then((answer) => {
//             // Create a switch case for what the user wants to add
//             switch (answer.userChoice) {
//                 case "Department":
//                     let query = 'INSERT INTO Departments (name) VALUES (${})';
//                     connection.query(query, (err, results) => {
//                         if (err) throw err;
//                         console.log(results);
//                         runSearch();
//                     });
//                     break;
//                 case "role":
//                     queryAddRole();
//                     break;
//                 case "employee":
//                     queryAddEmployee();
//                     break;
//             }
//         })

// }​


// function queryView() {
//     inquirer.prompt({
//             type: 'list',
//             name: 'userView',
//             message: 'What would you like to view from the database?',
//             choices: [
//                 "View a department",
//                 "View a role",
//                 "View an employee",
//             ]
//         })
//         .then((answer) => {
//             switch (answer.userView) {
//                 case "View a department":
//                     let query = 'SELECT * FROM Departments';
//                     connection.query(query, (err, results) => {
//                         if (err) throw err;
//                         console.log(results);
//                         runSearch();
//                     });
//                     break;
//                 case "View a role":
//                     let query = 'SELECT * FROM role';
//                     connection.query(query, (err, results) => {
//                         if (err) throw err;
//                         console.log(results);
//                         runSearch();
//                     });

//                     break;
//                 case "View a employee":
//                     queryAddEmployee();
//                     break;
//             }


//         });
// }​