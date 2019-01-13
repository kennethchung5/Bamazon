# Bamazon

still in progress...

Description
Bamazon is a virtual store backed by a SQL database and . This repo is a set of applications that allow users to interact with the store in 3 roles: customer, manager, or supervisor. 


Prerequisites:
NodeJS
SQL IDE (e.g. MySQL Workbench)


Setup: 
1.Clone the Bamazon repository to your computer.
2.Navigate to your local copy of the repo through the command line/terminal (CLI). Then, run 
    npm install
This will install the three additional Node packages (dependencies) used by the apps: inquirer, mysql, and console.table.
3.Open the file 'bamazon.sql' in your local SQL environment and run the script. 
This will set up the bamazon database, creating the tables and populating them with sample data (like schema.sql and seeds.sql files). 
4.Edit the 'connection.js' file to match your SQL environment's credentials.


Using the apps: 
There are 3 application files to run: 'bamazonCustomer.js', 'bamazonManager.js', and 'bamazonSupervisor.js'. To run an app, run the command "node " followed by the app's filename in the CLI:
    node bamazonCustomer.js
    node bamazonManager.js
    node bamazonSupervisor.js
Then, simply follow the prompts. 
Each application runs indefinitely (returning to its original menu after each course of action). To stop running an app, press CTRL+C.