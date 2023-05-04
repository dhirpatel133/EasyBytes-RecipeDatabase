import mysql2 from 'mysql2'
import fs from 'fs'
import { parse } from 'csv-parse';
import readline from 'readline'

const connection = require("./database").default;

function createTables() {
  var createTableQueries = readline.createInterface({
    input: fs.createReadStream("../db/createproductiontables.sql"),
    terminal: false
   });
  
  createTableQueries.on('line', function(chunk){
    connection.query(chunk.toString('ascii'), function(err, sets, fields){
     if(err) console.log(err);
    });
  });
  return
}

function populateUsers() {
  fs.createReadStream("../db/production-data/users.csv")
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", function (row) {
    connection.query(
      `INSERT INTO users (user_name, user_password, first_name, last_name, user_picture, preference_one, preference_two, preference_three) VALUES ('${row[0]}', '${row[1]}', '${row[2]}', '${row[3]}', '${row[4]}', '${row[5]}', '${row[6]}', '${row[7]}')`,
    );
  })
}
function populateRecipes() {
  fs.createReadStream("../db/production-data/recipes.csv")
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", function (row) { 
      connection.query(
        `INSERT INTO recipes (user_id, dish_name, cuisine, cook_time, ingredients, instructions, calories, meal_type, health_label, health_score, servings, recipe_picture) VALUES (100, '${row[0]}', '${row[1]}', ${parseInt(row[2])}, '${row[3]}', '${row[4]}', ${parseInt(row[5])}, '${row[6]}', '${row[7]}', ${parseInt(row[8])}, ${parseInt(row[9])}, '${row[10]}');`,
      );
    })
}

setTimeout(function() {
  createTables();
}, 100)

setTimeout(function() {
  populateUsers();
}, 500)

setTimeout(function() {
  populateRecipes();
  console.log("Populated tables with sample data!")
}, 1000)