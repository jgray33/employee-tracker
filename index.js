const inquirer = require("inquirer");
const queries = require("./server")
const addEmployee = require("./lib/addEmployee")
const viewDepartments = queries.viewDepartments
const viewRoles = queries.viewRoles


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
      "Remove",
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
      viewDepartments()
      break;
    case "View all roles":
      console.log("View all roles");
      viewRoles()
      break;
    case "View employees":
      switch (mainMenuOptions.viewEmployees) {
        case "View all":
          console.log("View all selected");
          break;
        case "View by manager":
          console.log("View by man");
          break;
        case "View by department":
          addDepartment();
          break;
        default:
          console.log("Try again");
      }
      break;
    case "View budget":
      console.log("View budg");
      break;
    case "Add a department":
      addDepartment;
      break;
    case "Add a role":
      console.log("Add a role");
      break;
    case "Add an employee":
      addEmployee()
    //   await askQuestions()
      break;
    case "Update an employee role":
      console.log("Update role");
      break;
    case "Remove":
      switch (mainMenuOptions.removeEmployees) {
        case "Delete department":
          console.log("Del dep");
          break;
        case "Delete role":
          console.log("Del role");
          break;
        case "Delete employee":
          console.log("del emp");
          break;
        default:
          console.log("Something went wrong");
      }
  }
}

askQuestions();

async function addDepartment() {
  console.log("Department added");
  const newDepartment = await inquirer.prompt(addDepartmentQ);
}

module.exports = askQuestions

// Inquirer:
// 1. View all departments
// 2. View all roles
// 3. View all employees
//  3a. View employees by manager
//  3b. View employees by department
// 4. Add a department
// 5. Add a role
// 6. Add an employee
// 7. Update an employee role
// 8. Remove
// 8a. Delete department
// 8b. Delete role
// 8c. Delete employee

// View all departments = formatted table > Department Names // Department IDs

// View all roles = table > Job title // Role ID // Departments the role belongs to // Salary for the role

// View all employees = table > Employee ID // First name // Last name // Job title //
//  Department // Salary // Managers that employee reports to

// Add a department = Add name of department to the database

// Add a role = Add name, salary, department for the role to the database.

// Add an employee = Add employees first name, last name, role, manager.

// Update employee role = Select employee and update role.

// Update employee managers = Select employee and update manager

// View employees by manager

// View employees by department

// Delete departments, roles, and employees.

// View the total utilized budget of a department = the combined salaries of all employees in that department.
