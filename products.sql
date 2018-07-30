DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Stephen King's It", "Books", 12.99, 16);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pug sweater", "Clothing", 29.99, 9);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPhone 6", "Electronics", 199, 22);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Monopoly", "Games", 19.99, 48);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bongo Drum", "Toys", 16.99, 13);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Alligator Doll", "Toys", 12.49, 24);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Mario Party", "Games", 29.99, 19);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dune", "Books", 14.99, 22);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Candy Canes", "Candy", 7.99, 45);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Trumpet", "Musical Instrument", 249.99, 6);
