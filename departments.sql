USE bamazon;

CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(45) NOT NULL,
  over_head_costs DECIMAL(10, 2) NOT NULL,
  PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Books", 2000);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Clothing", 1000);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Electronics", 3000);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Games", 1000);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Candy", 500);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Musical Instrument", 2000);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Movies", 1000);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Toys", 1000);