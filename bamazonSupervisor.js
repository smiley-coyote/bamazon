var inquirer = require("inquirer");
var mysql = require("mysql");
const cTable = require('console.table');


var connection = mysql.createConnection({
   host: "localhost",
 
   // Your port; if not 3306
   port: 3306,
 
   // Your username
   user: "root",
 
   // Your password
   password: "root",
   database: "bamazon"
 });
 
 connection.connect(function(err) {
   if (err) throw err;
   console.log("connected as id " + connection.threadId);
   runSupervisor();
 });

 function runSupervisor(){
    inquirer.prompt([
       {
          name: "action",
          type: "list",
          message: "What would you like to do today?",
          choices: ["View Product Sales by Department", "Create New Department"]
       }
    ]).then(function(results){
       if(results.action == "View Product Sales by Department"){
          viewProducts();
       }
       if(results.action == "Create New Department"){
         connection.query("SELECT * FROM departments", function(err, res){
            if (err) throw err;
            console.log("Current departments: ")
            console.log("-------------------")
            for(i=0;i<res.length;i++){
               console.log(res[i].department_name);
            }
         })
          setTimeout(createNewDept, 500);
       }
    })
 }

 function viewProducts(){
   var query = "SELECT departments.department_id, departments.department_name, departments.over_head_costs, products.department_name, products.product_sales ";
   query += "FROM products INNER JOIN departments ON (departments.department_name = products.department_name) GROUP BY departments.department_name ORDER BY department_id";
   connection.query(query, function(err, res){
      var newArr = [];
      var totalProfits;
     for(i=0;i<res.length;i++){
      totalProfits = res[i].product_sales - res[i].over_head_costs;
      res[i].total_profits = totalProfits;
      newArr.push(res[i]);
     }
     console.log("\n")
      console.table(newArr);
      setTimeout(runSupervisor, 1500);
   })
   

 }

 function createNewDept(){
   inquirer.prompt([
      {
         name: "department",
         message: "Enter name of new department"
      },
      {
         name: "cost",
         message: "Enter the over head costs of new department"
      }
   ]).then(function(result){
      var query = connection.query("INSERT INTO departments SET ?",
      {
         department_name: result.department,
         over_head_costs: result.cost
      }, function(err, res){
         console.log(res.affectedRows + " new department inserted!\n");
      }
   )
   console.log(query.sql)

   setTimeout(runSupervisor, 2000);
   })
      }
   
 