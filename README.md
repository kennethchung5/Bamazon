# Bamazon

**Description**<br/>
Bamazon is a simulated virtual store accessible through the Command Line Interface (CLI). The user interacts with the store by running any of three Node applications, each representing a role: Customer, Manager, or Supervisor. The user responds to prompts to perform various actions, including purchasing items, adding to the inventory, and viewing profit by department. The store is backed by a SQL database, so data persist across sessions; each transaction affects the database, thus influencing the user's future experience with the apps. 

**Setup**<br/>
These apps are to be run in the CLI; there is no deployed Web site. NodeJS is required, and the user will have to use NPM to install additional packages. Furthermore, setup entails creating a SQL database.<br/>

Prerequisites: NodeJS; SQL IDE (e.g. MySQL Workbench)

1. Clone the Bamazon repository to your computer.
2. Navigate to your local copy of the repo through the CLI. Then, run<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;npm install<br/>
&nbsp;This will install the three additional Node packages (dependencies) used by the apps: inquirer, mysql, and console.table.
3. Open the file 'bamazon.sql' in your local SQL environment and run the script. 
   This will set up the bamazon database, creating the tables and populating them with sample data (like schema.sql and seeds.sql files). 
4. Edit the 'connection.js' file to match your SQL environment's credentials.

**Using the apps**<br/> 
There are 3 application files to run: 'bamazonCustomer.js', 'bamazonManager.js', and 'bamazonSupervisor.js'. To run an app, enter the command "node " followed by the app's filename in the CLI:<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;node bamazonCustomer.js<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;node bamazonManager.js<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;node bamazonSupervisor.js<br/>
Then, simply follow the prompts. Each application runs indefinitely (returning to its original menu after each course of action). To stop running an app, press CTRL+C.

**Demonstration**<br/>
https://drive.google.com/file/d/1Aas04sHKyo1mbQ7icv2VB2X1pXLUbtPd/view?usp=sharing
