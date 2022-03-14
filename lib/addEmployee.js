const inquirer = require("inquirer")
const Employee = require("./Employee")


let addEmployeeQuestions = [
    {
        type: "input",
        name: "employeeId",
        message: "Please add the employee ID",
    },
    {
        type: "input",
        name: "firstName",
        message: "Please add the employee's first name",
    },
    {
        type: "input",
        name: "lastName",
        message: "Please add the employee's last name",
    },
    {
        type: "input",
        name: "roleId",
        message: "Please add the employee's role Id",
    },
    {
        type: "input",
        name: "managerId",
        message: "Please add the employee's manager Id",
    },
]

async function addEmployee() {
    addNewEmployee = await inquirer.prompt(addEmployeeQuestions)
    const employee = new Employee(
        addNewEmployee.employeeId,
        addNewEmployee.firstName,
        addNewEmployee.lastName, 
        addNewEmployee.roleId,
        addNewEmployee.managerId,
    )
    console.log("Employee added")
    console.log(employee)
}

module.exports = addEmployee