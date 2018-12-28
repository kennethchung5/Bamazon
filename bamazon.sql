/*
CREATE DATABASE bamazon;

use bamazon;
*/

DROP TABLE products;


CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(9,2) NOT NULL,
    stock_quantity INT NOT NULL,
    primary key(item_id)
);






INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
("laptop", "computers", 799.99, 4),
("digital piano", "musical instruments", 600.00, 3),
("cooking utensils", "home goods", 20.99, 8),
("wallet", "accessories", 15.50, 6),
("optical mouse", "computers", 14.99, 15)
;

SELECT * FROM products;