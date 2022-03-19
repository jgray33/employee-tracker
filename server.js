const express = require("express");
const mysql = require("mysql2")

const PORT = process.env.PORT || 3000;
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


app.listen(PORT, () => {
  console.log(`Server running on Port${PORT}`);
});



let addDepartmentQ = [
  {
    type: "input",
    name: "addDep",
    message: "Please write the name of the department you would like to add",
  },
];

let addRoleQ = [
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
    choices: ["1", "2"],
  },
];




// async function addDepartment() {
//   console.log("Department added");
//   const newDepartmentAns = await inquirer.prompt(addDepartmentQ);
//   let depToAdd = newDepartmentAns.addDep;
//   addDepartmentQuery(depToAdd);
// }

// async function addRole() {
//   const newRoleAns = await inquirer.prompt(addRoleQ);
//   let roleToAdd = newRoleAns.newRoleName;
//   let newRoleSalary = newRoleAns.newRoleSalary;
//   let newRoleDep = newRoleAns.newRoleDep;
//   addRoleQuery(roleToAdd, newRoleSalary, newRoleDep);
// }

// function listCurrentDeps() {
//   let departmentArray = [];
//   db.query("SELECT department_name FROM department", (err, results) => {
//     if (err) {
//       console.log(err);
//     }
//     results.forEach((department) =>
//       departmentArray.push(department.department_name)
//     );
//   });
//   //   return departmentArray;
//   console.log(departmentArray);
// }

// listCurrentDeps();















