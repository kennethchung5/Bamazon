/*
CREATE DATABASE bamazon;

use bamazon;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(9,2) NOT NULL,
    stock_quantity INT NOT NULL,
    primary key(item_id)
)
*/

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ()
