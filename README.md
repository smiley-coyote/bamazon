# Bamazon Shop App

Welcome to Bamazon! This is a Node.js based app that pulls and updates data from mySQL database tables.

## Instructions
This is a back end app that has no front end. In order to run, you'll need to do an "npm install" to install all of the dependencies. Once this completes, within the terminal run one of the files (bamazonCustomer.js, bamazonManager.js, or bamazonSupervisor.js) with node ("node <file name>"). 

### Each .js file asks a series of questions within the console.
* bamazonCustomer.js - You are the customer and are asked what item you would like to purchase and the quantity. A table is displayed with the item ids, item names, department names, prices, and quantities available. Once you decide on an item to purchase you enter the item ID number and quantity number. The costs are totaled up, and once the purchase is confirmed the quantity and total profits are updated in the database.
* bamazonManager.js - You are the manager and are given a list of several options - view products for sale, view low inventory, add to inventory, and add new product. View products for sale - displays all of the products' information within a table including the total product sales amounts in dollars. View low inventory - displays a table with the products that have less than 5 left in stock. Add to inventory - asks for an item ID and quantity amount you'd like to add and updates the stock quantity of that item in the database. Add new product - lets the manager add a brand new item to sell. A list of department names will be imported from the departments table  so that the manager can assign the item to a department from the list. The manager will also be asked to enter the price and stock quantity. Once submitted, the new item will be added to the products table within the bamazon database.
* bamazonSupervisor.js - You are the supervisor and are given a list of two options - View product sales by department and create new department. Viewing product sales by department will inner join the products and department tables matching up and grouping by the department name. A new column is created dynamically housing the total profits, which is determined by subtracting the overhead costs from the product sales number, and displaying the total profits. Creating a new department will ask for the supervisor to type in a new department name and its overhead costs. Once submitted the database departments table will be updated with the new data.

### List of npm packages used in this project:
* inquirer (https://www.npmjs.com/package/inquirer)
* mysql (https://www.npmjs.com/package/mysql)
* console.table (https://www.npmjs.com/package/console.table)

### Video demo
* https://drive.google.com/file/d/1ffGzFzFyZCrT7QDLQzOxF-Y2QSgKV4Dl/view
