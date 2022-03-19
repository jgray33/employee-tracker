
  function addDepartmentQuery(depToAdd) {
    db.query(
      `INSERT INTO department (department_name) VALUES ("${depToAdd}")`,
      (err, results) => {
        if (err) {
          console.log(err);
        }
        console.log(`${depToAdd} department added!`);
      }
    );
  }
  
  
   
  
  function addRoleQuery(roleToAdd, newRoleSalary, newRoleDep) {
  let getDepId = (newRoleDep) => {
  db.query("SELECT * FROM department", (err, results) => {
      for (const key in object) {
          if (Object.hasOwnProperty.call(object, key)) {
              const element = object[key];
              console.log(results)
          }
      }
  })
  }
  
  
   db.query(`INSERT INTO role (title, salary, department_id) VALUES (${roleToAdd}, ${newRoleSalary}, ${newRoleDep})`, (err, results) => {
      if (err) {
          console.log(err);
        } console.log( "Role added")
        console.log(results)
      })}
  
  
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

  module.exports = {
    viewDepartments,
    viewRoles,
    viewAllEmployees,
    addDepartmentQuery,
    addRoleQuery,
    listCurrentDeps,
  };



 
const addEmployee = require("./lib/addEmployee")
const viewDepartments = queries.viewDepartments
const viewRoles = queries.viewRoles
const viewAllEmployees = queries.viewAllEmployees
const addDepartmentQuery = queries.addDepartmentQuery
const addRoleQuery = queries.addRoleQuery
