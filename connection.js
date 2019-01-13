var mysql = require("mysql");

var connection = mysql.createConnection({
    // edit these values to match your SQL credentials: 
    host: "localhost",  
    port: 3306,
  
    user: "root",    
    password: "MySQLpassword",
  
    database: "bamazon"
  });

  module.exports = connection;