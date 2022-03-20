  
  
   
  
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

