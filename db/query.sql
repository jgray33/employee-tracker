SELECT * 
FROM department
JOIN role ON department.department_id = role.department_id

SELECT * 
FROM role 
JOIN employee on role.role_id = employee.role_id


-- // View all roles = table > Job title // Role ID // Departments the role belongs to // Salary for the role
SELECT role.id, role.title, role.salary, department.department_name
FROM role 
INNER JOIN department ON role.department_id = department.id

-- // View all employees = table > Employee ID // First name // Last name // Job title // Department // Salary // Managers that employee reports to
--  Select * from employees