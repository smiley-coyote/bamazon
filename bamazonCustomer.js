var inquirer = require("inquirer");
var mysql = require("mysql");
const cTable = require('console.table');

// global variables
var id;
var quantity;
var item;
var price;
var newQuantity; 
var total;



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
   readProducts()
 });

 function readProducts() {
   console.log("Selecting all products...\n");
   connection.query("SELECT products.item_id, products.product_name, products.department_name, products.price, products.stock_quantity FROM products", function(err, res) {
     if (err) throw err;
     console.table(res);
     startCustomer();
   });
 }

 function startCustomer(){
   inquirer.prompt([
      {
         name: "id",
         message: "Enter ID of product you would like to purchase"
      },
      {
         name: "quantity",
         message: "Enter quantity"
      }
   ]).then(function(response){
      id = response.id;
      quantity = response.quantity;
      console.log("id: " + id);
      connection.query("SELECT * FROM products WHERE ?", 
      {
         item_id: id
      }, 
      function(err, res) {
         if (err) throw err;
        
            if(quantity < res[0].stock_quantity){  
               item = res[0].product_name;
               price = res[0].price;
               newQuantity = res[0].stock_quantity - quantity;
               var nTotal = res[0].price * quantity;
               total = nTotal.toFixed(2);
               productTotal = total + res[0].product_sales;
               startPurchase();
            } else if (quantity > res[0].stock_quantity){
               console.log("Product unavailable")
               setTimeout(readProducts, 2000)
            
            
         }
        
      })
   })
 }

 function startPurchase() {
   inquirer.prompt([
      {
         type: "confirm",
         message: "Are you sure you'd like to purchase " + quantity + " " + item + "(s) for " + total + "?",
         name: "confirm"
      }
   ]).then(function(response){
      if(response.confirm){
         console.log("Thank you for your purchase!");
         inquirer.prompt([
            {
               type: "confirm",
               message: "Would you like to make another purchase?",
               name: "confirm2",
            }
         ]).then(function(response2){
            if(response2.confirm2){
               updateProduct();
               readProducts();
            }else{
               updateProduct();
               console.log("Have a nice day!");
            }
         })
      }else {
         readProducts();
      }
   })

 }

 function updateProduct() {
   var query = connection.query(
     "UPDATE products SET ? WHERE ?",
     [
       {
         stock_quantity: newQuantity,
         product_sales: productTotal
       },
       {
         item_id: id 
       }
     ],function(err, res){
     }
   )};