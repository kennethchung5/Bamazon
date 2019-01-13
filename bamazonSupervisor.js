var inquirer = require("inquirer");

require("console.table");

var connection = require("./connection");


connection.connect(function(error) {
    if (error) throw error;

    console.log("Welcome, supervisor!");
    setTimeout(supervisorActions, 2000);
})

function returnSupervisorMenu() {
    console.log("Returning to supervisor menu...");

    setTimeout(supervisorActions, 2000);
};

function supervisorActions() {

    inquirer.prompt([
        {
            name: "supervisorAction",
            type: "list",
            choices: ["View Product Sales by Department", "Create New Department"],
            message: "Choose an action:"
        }
    ]).then(function(answers) {
        switch(answers.supervisorAction) {
            case "View Product Sales by Department": 
                viewProductSalesByDepartment();
                break;
            case "Create New Department":
                createDepartment();
                break;
            default: 
                console.log("Something's wrong.");
        }
    })
};


function viewProductSalesByDepartment() {
    connection.query("SELECT department_id, departments.department_name, over_head_costs, SUM(product_sales), (SUM(product_sales) - over_head_costs) AS total_profit FROM departments LEFT JOIN products ON departments.department_name = products.department_name GROUP BY department_id, departments.department_name, over_head_costs ORDER BY department_id"
                    , function(error, results) {
                        if (error) throw error;

                        console.table(results);

                        returnSupervisorMenu();
                    })
}


function createDepartment() {
    inquirer.prompt([
        {
            name: "department_nameInput",
            type: "input",
            message: "Enter the department name:",
            validate: function(input) {
                    if (input.trim() == "") {
                        return "A department name is required!";
                    } else {
                        return true;
                    }
                }
        },
        {
            name: "over_head_costsInput",
            type: "input",
            message: "Enter the department's overhead costs:",
            validate: function(input) {
                    if (input > 0) {
                        return true;
                    } else {
                        return "Enter a positive number!"
                    }
                }
        }
    ]).then(function(answers) {
        connection.query("INSERT INTO departments SET ?", 
                            [
                                {
                                    department_name: answers.department_nameInput,
                                    over_head_costs: answers.over_head_costsInput
                                }
                            ],
                            function(error) {
                                if (error) throw error;

                                console.log("Department added!");

                                returnSupervisorMenu();
                            })
        
    })
};