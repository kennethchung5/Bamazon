var inquirer = require("inquirer");
var mysql = require("mysql");

require("console.table");

var connection = mysql.createConnection({
  host: "localhost",  
  port: 3306,

  user: "root",
  password: "MySQLpassword",

  database: "bamazon"
});



connection.connect(function(err) {
  if (err) throw err;
  console.log("Welcome to Bamazon!");

  setTimeout(presentItems, 2000);  
});


function returnMainMenu() {
  console.log("Returning to main menu...");
  setTimeout(presentItems, 2000);
}

function presentItems() {

  connection.query("SELECT item_id, product_name, price FROM products ORDER BY item_id", function(error, results) {
    if (error) throw error;

    console.log("\n");
    console.table(results);

    takeOrder();
  })
}

function takeOrder() {
  inquirer.prompt([
    {
      name: "itemChoice",
      message: "Enter the item_id of the product you wish to purchase.",
      type: "input",
      validate: function(input) {
          if (input == parseInt(input)) {
            return true;
          } else {
            return "Please enter an integer."
          }
        }
    },
    {
      name: "quantity",
      message: "Enter a quantity (in units) to purchase.",
      type: "input",
      validate: function(input) {
        if (input == parseInt(input) && parseInt(input) > 0) {
          return true;
        } else {
          return "Please enter a positive integer."
        }
      }
    }
  ]).then(function(answers) {

    connection.query("SELECT stock_quantity, price FROM products WHERE ?", 
                      [{item_id: answers.itemChoice}], 
                      function(error, results) {
                        if (error) throw error;
                        if (results.length === 0) {
                          console.log("There is no item with that id.");

                          returnMainMenu();
                        } else if (results[0].stock_quantity >= answers.quantity) {
                          // transaction goes through; calculate new stock and transaction cost first
                          var newStock = results[0].stock_quantity - answers.quantity;
                          var transactionCost = (answers.quantity * results[0].price).toFixed(2);
                          
                          connection.query("UPDATE products SET ? WHERE ?", 
                          [{stock_quantity: newStock}, 
                          {item_id: answers.itemChoice}], 
                          function(error) {
                            if (error) throw error;

                            console.log("Transaction confirmed! Your total is $" + transactionCost);

                            returnMainMenu();
                          })
                        } else {
                          //insufficient quantity
                          console.log("Sorry, we don't have enough of this item to fulfill your request.");

                          returnMainMenu();
                        }
                    
                      })

  })
};