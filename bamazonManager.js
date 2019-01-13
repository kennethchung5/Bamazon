var inquirer = require("inquirer");

require("console.table");

var connection = require("./connection");


connection.connect(function(error) {
    if (error) throw error;

    console.log("Welcome, manager!");
    setTimeout(managerActions, 2000);
})

function returnManagerMenu() {
    console.log("Returning to manager menu...");
    setTimeout(managerActions, 2000);
};

function managerActions() {

    inquirer.prompt([
        {
            name: "managerAction",
            type: "list",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
            message: "Choose an action:"
        }
    ]).then(function(answers) {
        switch(answers.managerAction) {
            case "View Products for Sale": 
                viewProducts();
                break;
            case "View Low Inventory":
                viewLowInventory()
                break;
            case "Add to Inventory": 
                addToInventory();
                break;
            case "Add New Product":
                addProduct();
                break;
            default: 
                console.log("something's wrong");
        };

        
    });

};


function viewProducts() {
    connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function(error, results) {
        if (error) throw error;

        console.log("Current inventory: \n");
        console.table(results);

        returnManagerMenu()
    });
};

function viewLowInventory() {
    connection.query("SELECT item_id, product_name, price, stock_quantity FROM products WHERE stock_quantity < 5", function(error, results) {
        if (error) throw error;

        console.log("Low inventory: \n");
        console.table(results);

        returnManagerMenu()
    });
};

function addToInventory() {
    inquirer.prompt([
        {
            name: "itemChoice",
            message: "Select an item by entering its item_id or product_name:",
            type: "input",
        },
        {
            name: "quantityToAdd",
            message: "Enter the number of units to be added:",
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
        //handle input for either item_id or product_name; assign to variable to dynamically choose column for WHERE clause
        var lookupField = (answers.itemChoice == parseInt(answers.itemChoice)) ? "item_id" : "product_name";

        connection.query("UPDATE products SET stock_quantity = stock_quantity + " + answers.quantityToAdd + " WHERE ?",
                            [                                
                                {[lookupField]: answers.itemChoice}
                            ],
                            function(error, results) {
                                if (error) throw error;

                                if (results.affectedRows === 0) {
                                    console.log("There are no items with the provided " + lookupField + ".");
                                } else {
                                    console.log(answers.quantityToAdd + " units of item '" + answers.itemChoice + "' added to inventory.");
                                }
                                
                                returnManagerMenu()
                            })

    })
};

function addProduct() {
    inquirer.prompt([
        {
            name: "product_nameInput",
            type: "input",
            message: "Enter the product name:", 
            validate: function(input) {
                    if (input.trim() == "") {
                        return "A product name is required!"
                    } else {
                        return true;
                    }
                }
        },
        {
            name: "department_nameInput",
            type: "input",
            message: "Enter the department:",
            validate: function(input) {
                    if(input.trim() == "") {
                        return "Department is a required field!";                    
                    } else {
                        return true;
                    }
                }
        },
        {
            name: "priceInput",
            type: "input",
            message: "Enter the item's price:",
            validate: function(input) {
                    if (input > 0) {
                        return true;
                    } else {
                        return "Enter a positive number!"
                    }                
                }
        },
        {
            name: "stock_quantityInput",
            type: "input",
            message: "Enter an initial stock quantity (in units):",
            validate: function(input) {
                    if (input == parseInt(input) && parseInt(input) > 0) {
                        return true;                    
                    } else {
                        return "Enter a positive integer!";
                    }
                }
        }
    ]).then(function(answers) {
        connection.query("INSERT INTO products SET ?", 
                            [
                                {
                                    product_name: answers.product_nameInput.trim(),
                                    department_name: answers.department_nameInput.trim(),
                                    price: answers.priceInput,
                                    stock_quantity: answers.stock_quantityInput
                                }
                            ],
                            function(error) {
                                if (error) throw error;

                                console.log("Product added!");

                                returnManagerMenu();
                            })
    })
};