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
   runManager();
 });

function runManager(){
   inquirer.prompt([
      {
         type: "list",
         message: "What would you like to do?",
         name: "select",
         choices: ["View products for sale", "View low inventory", "Add to inventory", "Add new product"]
      }
   ]).then(function(result){
      if(result.select == "View products for sale"){
         viewAll();
      }
      if(result.select == "View low inventory"){
         viewLow();
      }
      if(result.select == "Add to inventory"){
         addInventory();
      }
      if(result.select == "Add new product"){
         addNew();
      }
   })
}

function viewAll(){
   connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      console.table(res);
      runManager();
    });
  }

function viewLow(){
   connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err, res) {
      if (err) throw err;
      console.table(res);
   })
   setTimeout(runManager, 2000);
}

function addInventory(){
   connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      console.table(res);
   })
   var productArr = [];
   connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      for(i=0; i<res.length; i++){
         productArr.push(res[i].product_name)
      }
      selectFromInventory();
    });

    function selectFromInventory(){

   inquirer.prompt([
      {
         name: "id",
         message: "Enter ID of product you'd like to add to",
      },
      {
         name: "amount",
         message: "How many would you like to add?",
      }
   ]).then(function(result){
      connection.query("SELECT * FROM products WHERE ?", [{item_id:result.id}], function(err, res) {
         var newQuantity = res[0].stock_quantity += parseInt(result.amount)
         connection.query("UPDATE products SET ? WHERE ?",
         [
            {
               stock_quantity: newQuantity
            },
            {
               item_id: result.id
            }
         ], function(err, res2){
            console.log(res2.affectedRows + " product(s) updated!");
            setTimeout(viewAll, 1000)
         }
      )
      })
    })
}
}

function addNew(){
   var departments = [];
   connection.query("SELECT * FROM departments"), function(err, res){
      if (err) throw err;
      for(i=0;i<res.length;i++){
         departments.push(res[i].department_name);
      }
      console.log(departments);
   }
   inquirer.prompt([
      {
         name: "product",
         message: "Enter name of new item you would like to add"
      },
      {
         type: "list",
         name: "department",
         message: "Select name of department of new item",
         choices: departments
      },
      {
         name: "price",
         message: "Enter price of new item"
      },
      {
         name: "stock",
         message: "Enter quantity of new item"
      }
   ]).then(function(result){
      var query = connection.query("INSERT INTO products SET ?",
   {
      product_name: result.product,
      department_name: result.department,
      price: result.price,
      stock_quantity: result.stock,
      product_sales: 0.00
   }, function(err, res){
      console.log(res.affectedRows + " product inserted!\n");
   }
   )
   console.log(query.sql)
   setTimeout(viewAll, 2000);
   })
   
}