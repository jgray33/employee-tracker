INSERT INTO
    department (id, department_name)
VALUES
    (1, "History"),
    (2, "Spanish"),
    (3, "English");

INSERT INTO
    role (id, title, salary, department_id)
VALUES
    (30, "Teacher", 30000, 1),
    (31, "Teaching Assistant", 25000, 1),
    (32, "Teacher", 30000, 2),
    (33, "Work Experience", 11000, 3),
    (34, "Cleaner", 25000, 3),
    (35, "Manager", 40000, 1),
    (36, "Manager", 40000, 2);

INSERT INTO 
employee (employee_id, first_name, last_name, role_id, manager_id)
VALUES
(100, "Julia", "Gray", 30, 101),
(101, "Helen", "Pants", 35, NULL),
(102, "Jasmine", "Spoon", 33, 100),
(103, "Alexia","Table", 32, 104),
(104, "Betsy", "Lamp", 36, NULL)