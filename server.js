const express = require("express")
const mysql = require("mysql2");

const PORT = process.env.PORT || 3001;
const app = express()

app.use(express.urlencoded({ extended: true}))
app.use(express.json)

const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "password",
        database: "employee_db"
    },
    console.log("Connected to employee database")   
)

function viewDepartments() {
    db.query("SELECT * FROM department", function(err, results){
        console.log(results)
    })
}

app.listen(PORT, () => {
    console.log(`Server running on Port${PORT}`)
})

module.exports = viewDepartments