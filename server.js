const express = require("express");
const mysql = require("mysql2");
const { debugPort } = require("process");
const askQuestions = require("./index");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json);

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "password",
    database: "employee_db",
  },
  console.log("Connected to employee database")
);

// View departments functions ------------
function viewDepartments() {
  db.query("SELECT * FROM department", (err, results) => {
    if (err) {
      console.log(err);
    }
    console.table(results);
  });
}

// View roles function -----------------------
function viewRoles() {
  db.query(
    "SELECT role.id, role.title, role.salary, department.department_name FROM role INNER JOIN department ON role.department_id = department.id",
    (err, results) => {
      if (err) {
        console.log(err);
      }
      console.table(results);
    }
  );
}

function addDepartmentQuery(depToAdd) {}

// View all employees function ----------------
function viewAllEmployees() {
  db.query(
    "SELECT employee.employee_id, employee.first_name, employee.last_name, role.title, department.department_name, role.salary, employee.manager_id FROM employee INNER JOIN role ON role.id = employee.role_id INNER JOIN department ON role.department_id  = department.id",
    (err, results) => {
      if (err) {
        console.log(err);
      }
      console.table(results);
    }
  );
}

let deletedRow;

function deleteDepartment() {
  db.query(`DELETE FROM department WHERE id = ?`, deletedRow, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
    askQuestions();
  });
}

app.listen(PORT, () => {
  console.log(`Server running on Port${PORT}`);
});

module.exports = { viewDepartments, viewRoles, viewAllEmployees };
