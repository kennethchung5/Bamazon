DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

use bamazon;


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
("optical mouse", "computers", 14.99, 15),
("humidifier", "home goods", 19.99, 4),
("softball glove", "sporting goods", 59.99, 3),
("shorts", "sporting goods", 24.99, 10),
("football cleats", "sporting goods", 44.99, 5),
("football gloves", "sporting goods", 34.99, 6),
("umbrella", "accessories", 12.00, 4),
("chocolate sandwich cookies", "grocery", 1.79, 4),
("toasted oats cereal", "grocery", 1.29, 6),
("metronome", "musical instruments", 23.99, 8),
("desk lamp", "home goods", 14.99, 12),
("bananas", "grocery", 3.99, 40)
;

ALTER TABLE products 
ADD product_sales DECIMAL(12,2) DEFAULT 0.00;





CREATE TABLE departments (
	department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(50) NOT NULL,
    over_head_costs DECIMAL(9,2) NOT NULL,
    primary key (department_id)
);

INSERT INTO departments (department_name, over_head_costs)
VALUES 
("computers", 2550.00),
("musical instruments", 1400.00),
("home goods", 144.99),
("accessories", 130.00),
("sporting goods", 350.00),
("grocery", 90.99)
;

/*
SELECT * FROM products ORDER BY department_name, item_id;
SELECT * FROM departments;


SELECT department_id, departments.department_name, over_head_costs, SUM(product_sales), (SUM(product_sales) - over_head_costs) AS total_profit
FROM departments 
LEFT JOIN products 
ON departments.department_name = products.department_name
GROUP BY department_id, departments.department_name, over_head_costs
ORDER BY department_id
*/




