const inquirer = require("inquirer");
const mysql = require("mysql2");
const express = require("express");
const fs = require("fs");

// Connect to the database ----------------------------------------------
const PORT = process.env.PORT || 3003;
const app = express();

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "password",
    database: "employee_db",
  },
  console.log("Connected to employee database")
);

app.listen(PORT, () => {
  console.log(`Server running on Port${PORT}`);
});

// Main questions------------------------------------------------------
let mainMenuQuestions = [
  {
    prefix: "What would you like to do today?",
    type: "list",
    name: "menuOption",
    // message: "What would you like to do today?",
    choices: [
      "View all departments",
      "View all roles",
      "View employees",
      "View budget",
      "Add a department",
      "Add a role",
      "Add an employee",
      "Update an employee role",
      "Update an employee manager",
      "Remove",
      "Exit",
    ],
  },
  {
    type: "list",
    name: "viewEmployees",
    message: "How would you like to view the employees?",
    choices: ["View all", "View by manager", "View by department"],
    when: (answers) => answers.menuOption === "View employees",
  },
  {
    type: "list",
    name: "removeEmployees",
    message: "What do you want to Delete?",
    choices: ["Delete department", "Delete role", "Delete employee"],
    when: (answers) => answers.menuOption === "Remove",
  },
];

let addDepartmentQ = [
  {
    type: "input",
    name: "addDep",
    message: "Please write the name of the department you would like to add",
  },
];

async function askQuestions() {
  const mainMenuOptions = await inquirer.prompt(mainMenuQuestions);
  switch (mainMenuOptions.menuOption) {
    case "View all departments":
      viewAllDepartments();
      break;
    case "View all roles":
      viewAllRoles();
      break;
    case "View employees":
      switch (mainMenuOptions.viewEmployees) {
        case "View all":
          viewAllEmployees();
          break;
        case "View by manager":
          viewEmployeesByManager();
          break;
        case "View by department":
          viewEmployeesByDepartment();
          break;
        default:
          console.log("Try again");
      }
      break;
    case "View budget":
      viewBudget();
      break;
    case "Add a department":
      addDepartment();
      break;
    case "Add a role":
      addRole();
      break;
    case "Add an employee":
      addEmployee();
      break;
    case "Update an employee role":
      updateEmployeeRole();
      break;
    case "Update an employee manager":
      updateEmployeeManager();
      break;
    case "Exit":
      console.log("Exit");
      break;
    case "Remove":
      switch (mainMenuOptions.removeEmployees) {
        case "Delete department":
          deleteDepartment();
          break;
        case "Delete role":
          deleteRole();
          break;
        case "Delete employee":
          deleteEmployees();
          break;
        default:
          console.log("Something went wrong");
      }
  }
}

askQuestions();

async function viewAllDepartments() {
  db.query("SELECT * FROM department", (err, results) => {
    if (err) {
      console.log(err);
    }
    console.table(results);
  });
}

async function viewAllRoles() {
  db.query(
    "SELECT role.title, role.id, role.salary, department.department_name FROM role INNER JOIN department ON role.department_id = department.id",
    (err, results) => {
      if (err) {
        console.log(err);
      }
      console.table(results);
    }
  );
}

async function viewAllEmployees() {
  let viewEmployeesQuery = fs.readFileSync(
    "./db/viewEmployeesQuery.sql",
    "utf8"
  );
  db.query(viewEmployeesQuery, (err, results) => {
    if (err) {
      console.log(err);
    }
    console.table(results);
  });
}

async function viewEmployeesByManager() {
  let viewEmployeesQuery = fs.readFileSync(
    "./db/viewEmployeeManQuery.sql",
    "utf8"
  );
  db.query(viewEmployeesQuery, (err, results) => {
    if (err) {
      console.log(err);
    }
    console.table(results);
  });
}

async function viewEmployeesByDepartment() {
  // View all employees by the department
  console.log("View all employees by department function");
}

async function viewBudget() {
  // View the total utilized budget of a department = the combined salaries of all employees in that department.
  console.log("View budget function");
}

async function addDepartment() {
  const newDepartment = await inquirer.prompt(addDepartmentQ);
  console.log(newDepartment.addDep);
  db.query(
    `INSERT INTO department (department_name) VALUES ("${newDepartment.addDep}")`,
    (err, results) => {
      if (err) {
        console.log(err);
      }
      console.log(`${newDepartment.addDep} department added!`);
    }
  );
  viewAllDepartments()
}


async function addRole() {
  // Add a role = Add name, salary, department for the role to the database.
  console.log("Add role");
}

async function addEmployee() {
  // Add an employee = Add employees first name, last name, role, manager.
  console.log("Add employee function");
}

async function updateEmployeeRole() {
  // Update employee role = Select employee and update role.
  console.log("Update employee role function");
}

async function updateEmployeeManager() {
  // Update employee managers = Select employee and update manager
  console.log("Update employee manager function");
}

async function deleteDepartment() {
  // Delete department function
  console.log("Delete department function");
}

async function deleteRole() {
  // Delete role function
  console.log("Delete role function");
}

async function deleteEmployees() {
  // Delete employees function
  console.log("Delete employees function");
}
