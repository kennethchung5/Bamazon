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
  connection.end();
});
