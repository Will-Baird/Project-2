DROP DATABASE IF EXISTS Project2_Test_DB;

CREATE DATABASE Project2_Test_DB;

USE Project2_Test_DB;

CREATE TABLE products
(
    id INT NOT NULL
    AUTO_INCREMENT,
    product_name VARCHAR
    (45) NULL,
    department_name VARCHAR
    (45) NULL,
    price DECIMAL
    (10,2) NULL,
    stock_quantity INT NULL,
    PRIMARY KEY
    (id)
);

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("Shirt", "Clothes", 15.00, 50);

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("Pants", "Clothes", 25.00, 75);

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("Watch", "Jewlery", 150.00, 25);

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("Necklace", "Jewlery", 90.00, 20);

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("Nike", "Shoes", 70.00, 85);

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("Adidas", "Shoes", 80.00, 75);

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("Phone", "Electronics", 800.00, 25);

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("Computer", "Electronics", 1000.00, 15);

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("TV", "Electronics", 15000.00, 10);