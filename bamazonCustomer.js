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
   connection.query("SELECT * FROM products", function(err, res) {
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
      connection.query("SELECT * FROM products", function(err, res) {
         if (err) throw err;
         for(i=0;i<res.length;i++){
            if(res[i].item_id == id &&  quantity < res[i].stock_quantity){
               console.log(res[i].product_name + " " + res[i].price + " " + res[i].stock_quantity)
               item = res[i].product_name;
               price = res[i].price;
               newQuantity = res[i].stock_quantity - quantity;
               total = res[i].price * quantity;
               startPurchase();
            } else if (res[i].item_id == id && quantity > res[i].stock_quantity){
               console.log("Product unavailable")
               setTimeout(readProducts, 2000)
            }
            
         }
        
      })
   })
 }

 function startPurchase() {
   inquirer.prompt([
      {
         type: "confirm",
         message: "Are you sure you'd like to purchase " + item + " for " + total + "?",
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
         stock_quantity: newQuantity
       },
       {
         item_id: id 
       }
     ],function(err, res){
      console.log(" products updated!\n");
     }
   )};