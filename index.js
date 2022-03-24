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

askQuestions();

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
      newRoleQ();
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
      process.exit()
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

async function viewAllDepartments() {
  db.query("SELECT * FROM department", (err, results) => {
    if (err) {
      console.log(err);
    }
    console.table(results);
    askQuestions();
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
      askQuestions();
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
    askQuestions();
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
    askQuestions();
  });
}

async function viewEmployeesByDepartment() {
  let viewByDepQuery = fs.readFileSync("./db/viewByDepartment.sql", "utf8");
  db.query(viewByDepQuery, (err, results) => {
    if (err) {
      console.log(err);
    }
    console.table(results);
    askQuestions();
  });
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
  viewAllDepartments();
}

async function newRoleQ() {
  db.query("SELECT * FROM department", (err, results) => {
    if (err) {
      console.log(err);
    }
    let departmentArray = results.map((dpts) => ({
      name: dpts.department_name,
      value: dpts.id,
    }));
    inquirer
      .prompt([
        {
          type: "input",
          name: "newRoleName",
          message: "Please write the name of the role you would like to add",
        },
        {
          type: "input",
          name: "newRoleSalary",
          message: "And the salary for that role?",
        },
        {
          type: "list",
          name: "newRoleDep",
          message: "Which department is this new role in?",
          choices: departmentArray,
        },
      ])
      .then((answers) => {
        db.query(
          "INSERT INTO role SET ?",
          {
            title: answers.newRoleName,
            salary: answers.newRoleSalary,
            department_id: answers.newRoleDep,
          },
          (err, results) => {
            if (err) {
              console.log(err);
            }
            console.log(`${answers.newRoleName} was successfully added`);
            askQuestions();
          }
        );
      });
  });
}

async function addEmployee() {
  let addNewQuery =
    "SELECT  role.title, CONCAT(m.first_name, SPACE(1), m.last_name) AS Manager, e.role_id, e.manager_id FROM employee e INNER JOIN role ON role.id = e.role_id LEFT JOIN employee m ON m.employee_id = e.manager_id";
  db.query(addNewQuery, (err, results) => {
    if (err) {
      console.log(err);
    }
    let roleArray = results.map((roleList) => ({
      name: roleList.title,
      value: roleList.role_id,
    }));
    let managerArray = results.map((managerList) => ({
      name: managerList.Manager,
      value: managerList.manager_id,
    }));
    inquirer
      .prompt([
        {
          type: "input",
          name: "addFirstName",
          message:
            "Please write the first name of the employee you would like to add",
        },
        {
          type: "input",
          name: "addLastName",
          message:
            "Please write the last name of the employee you would like to add",
        },
        {
          type: "list",
          name: "addNewEmpRole",
          message: "Please select the role of this new employee",
          choices: roleArray,
        },
        {
          type: "list",
          name: "addNewEmpMan",
          message: "Please select the Manager of this new employee",
          choices: managerArray,
        },
      ])
      .then((answers) => {
        db.query(
          "INSERT INTO employee SET ?",
          {
            first_name: answers.addFirstName,
            last_name: answers.addLastName,
            role_id: answers.addNewEmpRole,
            manager_id: answers.addNewEmpMan,
          },
          (err, results) => {
            if (err) {
              console.log(err);
            }
            console.log(`${answers.addFirstName} was added `);
            askQuestions();
          }
        );
      });
  });
}

function updateEmployeeRole() {
  db.query("SELECT * FROM role", (err, results) => {
    if (err) {
      console.log(err);
    }
    let roleArray = results.map((roleList) => ({
      name: roleList.title,
      value: roleList.id,
    }));
    db.query("SELECT * FROM employee", (err, results) => {
      if (err) {
        console.log(err);
      }
      let empArry = results.map((empList) => ({
        name: empList.first_name + " " + empList.last_name,
        value: empList.employee_id,
      }));
      console.log(empArry);
      inquirer
        .prompt([
          {
            type: "list",
            name: "employeeName",
            message: "Which employee would you like to update the role for?",
            choices: empArry,
          },
          {
            type: "list",
            name: "newRole",
            message: "Which role would you like to update the role for?",
            choices: roleArray,
          },
        ])
        .then((answers) => {
          db.query(
            "UPDATE employee SET ? WHERE ?",
            [
              { employee_id: answers.employeeName },
              { role_id: answers.newRole },
            ],
            (err, results) => {
              if (err) {
                console.log(err);
              }
              console.log("Employee updated");
              askQuestions();
            }
          );
        });
    });
  });
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
