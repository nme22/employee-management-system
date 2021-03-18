
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Thomas", "Hunt", 1, 4)
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("William", "Paulson", 2, 5)
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Joshua", "Wilson", 3, 6)

INSERT INTO roles (title, salary, department_id)
VALUES("Accountant", 75000.00, 1);
INSERT INTO roles (title, salary, department_id)
VALUES("Developer", 130000.00, 2);
INSERT INTO roles (title, salary, department_id)
VALUES("Engineer", 83000.00, 3);

INSERT INTO department (name) 
VALUES("OFFICE");
INSERT INTO department (name)
VALUES("Development");
INSERT INTO department (name)
VALUES("Engineering")