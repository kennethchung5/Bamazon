var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",  
  port: 3306,

  user: "root",
  password: "MySQLpassword",

  database: "bamazon"
});



connection.connect(function(err) {
  if (err) throw err;
  console.log("Connection established");

  presentItems();
  // connection.end();
});


function presentItems() {
  connection.query("SELECT item_id, product_name, price FROM products ORDER BY item_id", function(error, results) {
    if (error) throw error;

    console.log(results);



  })
}