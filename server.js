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







  
  

//   STUCK HERE
async function addRole() {
    // Get the list of departments
    let departmentArray = [];
    db.query("SELECT department_name FROM department", (err, results) => {
      if (err) {
        console.log(err);
      }
      results.forEach((department) => 
      departmentArray.push(department.department_name))
      let departments = departmentArray

// Add the departments into the inquirer
     inquirer. 
    prompt([
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
              choices: [...departments]
            },
          ])
 db.query(`INSERT INTO role (title, salary, department_id) VALUES (${answers.newRoleName}, ${answers.newRoleSalary}, ${answers.newRoleDep})`, (err, results) => {
    if (err) {
        console.log(err);
      } console.log( "Role added")
      console.log(results)
    })})}

// Gets the second bit in the object
    results.forEach((department) => {
        for (const depName in department) {
            console.log(`${department[depName]}`)


    let departmentArray = [];
    db.query("SELECT department_name FROM department", (err, results) => {
      if (err) {
        console.log(err);
      }
      results.forEach((department) =>
        departmentArray.push(department.department_name)
      );
      let listOfDepartments = [...new Set(departmentArray)];
      return listOfDepartments;


    //   let departmentArray = [];
    //         results.forEach((department) =>
    //           departmentArray.push(department.department_name)
    //         );
    //         let listOfDepartments = [...new Set(departmentArray)];
    //         return listOfDepartments;

        
  
   
  
     
   
    
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

    // This works
function listCurrentDeps() {
  let departmentArray = [];
  db.query("SELECT department_name FROM department", (err, results) => {
    if (err) {
      console.log(err);
    }
    results.forEach((department) =>
      departmentArray.push(department.department_name)
    );
    let listOfDepartments = [...new Set(departmentArray)];
    return listOfDepartments;
  });
}
  
  






// Get the array of departments
// if (departments.includes(newDepToBeAdded)) {
// console.log("${newDepToBeAdded} is already in the system")
// else { }



async function newRoleQ() {
    db.query("SELECT department_name FROM department", (err, results) => {
      if (err) {
        console.log(err);
      }
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
  
            choices: function () {
              let departmentArray = [];
              results.forEach((department) =>
                departmentArray.push(department.department_name)
              );
              let listOfDepartments = [...new Set(departmentArray)];
              return listOfDepartments;
            },
          },
        ])
        .then((answers) => {
          addNewRole(answers);
        });
    });
  }



