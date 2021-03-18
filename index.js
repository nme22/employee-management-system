const mysql = require("mysql");
const inquirer = require("inquirer");
const Employee = require('./util/employee');
const addNewRole = require('./util/roles')
const Department = require('./util/department')

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employeeDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    runSearch()
});

function runSearch() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                'Add An Employee',
                'Add a role',
                'Add a Department',
                'View department',
                'View roles',
                'View employees',
                'Update employee roles'
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "Add An Employee":
                    addEmployee();
                    break;

                case "Add a role":
                    addRole();
                    break;

                case "Add a Department":
                    addDepartment();
                    break;

                case "View department":
                    viewDepartment();
                    break;

                case "View roles":
                    viewRoles();
                    break;

                case "View employees":
                    viewEmployees();
                    break;

                case "Update employee roles":
                    updateEmployeeRole();
                    break;
            }
        });
}

// addEmployee function
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
    // create a new instance of employee

}

function addRole() {
    console.log('They selected to add a role')
    // find out which role they want to add
    inquirer.prompt([{
            type: 'input',
            name: 'id',
            message: 'What is the id for this role?'
        },
        {
            type: 'input',
            name: 'title',
            message: 'What is the name of this role?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the Salary for this role?'
        },
        {
            type: 'input',
            name: 'department_id',
            message: 'What is the department id?'
        },
    ]).then(answers => {
        // use constructor function to create a new role 
        // convert id and department_id to integers
        answers.id = parseInt(answers.id)
        answers.department_id = parseInt(answers.department_id)

        let newRole = new addNewRole(answers.id, answers.title, answers.salary, answers.department_id)
        connection.query("INSERT INTO roles Set ?", newRole, function (err, res) {
            if (err) throw err
        })
        console.table(newRole)
        console.log('This New Role has been sent for review!')
        // add new role to role table
    })
    // find role in data and update it

}

function addDepartment() {
    console.log('They selected to add a Department')
    inquirer.prompt([{
            type: 'input',
            name: 'id',
            message: 'What is the id for this department?'
        },
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of this department?'
        },
    ]).then(answers => {
        answers.id = parseInt(answers.id)
        let newDepartment = new Department(answers.id, answers.name)
        connection.query("INSERT INTO department Set ?", newDepartment, function (err, res) {
            if (err) throw err
        })
        console.table(answers)
    })
}

function queryEmployees() {
    return new Promise(resolve => {
        connection.query("SELECT * FROM employeeDB.employee", function (err, res) {
            if (err) throw err

            resolve(res)
        })
    })
}

async function viewEmployees() {
    const result = await queryEmployees()
    console.log(result);
    // JSON.parse(query)
}

function queryDepartments() {
    return new Promise(resolve => {
        connection.query("SELECT * FROM employeeDB.department", function (err, res) {
            if (err) throw err
            resolve(res)
        })
    })
}

async function viewDepartment() {
    const result = await queryDepartments()
    console.log(result)
    // JSON.parse(query)
}

function queryRoles() {
    return new Promise(resolve => {
        let data = connection.query("SELECT * FROM employeeDB.roles", function (err, res) {
            if (err) throw err
            resolve(res)
        })
    })
}

async function viewRoles() {
    const result = await queryRoles()
    console.log(result)
    // JSON.parse(query)
}

function updateEmployeeRole() {
    console.log('You selected to update an employee!')
    inquirer.prompt([{
            type: 'list',
            name: 'employee',
            message: 'Which Employee would you like to update',
            choices: [
                'Thomas hunt',
                'William Paulson',
                'Joshua Wilson'
            ]
        },
        {
            type: 'list',
            name: 'newRole',
            message: 'What is their new Role?',
            choices: [
                'Accountant',
                'Developer',
                'Engineer'
            ]
        }
    ]).then(answers => {
        console.log(answers)
    })
}