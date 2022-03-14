DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
    department_id INT PRIMARY KEY NOT NULL,
    department_name VARCHAR(30) NOT NULL
    );

CREATE TABLE role (
    role_id INT PRIMARY KEY NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
);

CREATE TABLE employee (
    employee_id INT PRIMARY KEY NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT
    FOREIGN KEY (role_id) REFERENCES role(role_id)
);

