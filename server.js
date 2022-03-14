const express = require("express");
const mysql = require("mysql2");

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

function viewDepartments() {
  db.query("SELECT * FROM department", (err, results) => {
          if (err) {
      console.log(err);
    }
    console.table(results);
  });
}

function viewRoles() {
  db.query("SELECT role FROM employee", function (err, results) {
    console.log(results);
  });
}

let deletedRow;

function deleteDepartment() {
  db.query(`DELETE FROM department WHERE id = ?`, deletedRow, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
  });
}

app.listen(PORT, () => {
  console.log(`Server running on Port${PORT}`);
});

module.exports = viewDepartments;
module.exports = viewRoles;
