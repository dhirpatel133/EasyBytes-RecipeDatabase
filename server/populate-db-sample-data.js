import mysql2 from 'mysql2'
import fs from 'fs'
import { parse } from 'csv-parse';
import readline from 'readline'
import { rejects } from 'assert';

const connection = mysql2.createConnection({
  host: 'localhost',
  port: 3306,
  database: 'recipe_db',
  user: 'root',
  password: 'mysqlroot' // replace this password with the password for you root user
});

function deleteTables() {
  var deleteTableQueries = readline.createInterface({
    input: fs.createReadStream("../db/deletetables.sql"),
    terminal: false
  });
    
  deleteTableQueries.on('line', function(chunk){
    connection.query(chunk.toString('ascii'), function(err, sets, fields){
      if(err) console.log(err);
    });
  });
}

function createTables() {
  var createTableQueries = readline.createInterface({
    input: fs.createReadStream("../db/createtables.sql"),
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
  fs.createReadStream("../db/sample-data/user-sample.csv")
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", function (row) {
    connection.query(
      `INSERT INTO users VALUES (${parseInt(row[0])}, '${row[1]}', '${row[2]}', '${row[3]}', '${row[4]}', '${row[5]}', '${row[6]}', '${row[7]}', '${row[8]}')`,
    );
  })
}
function populateRecipes() {
  fs.createReadStream("../db/sample-data/recipes-sample.csv")
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", function (row) { 
      connection.query(
        `INSERT INTO recipes VALUES (${parseInt(row[0])}, '${row[1]}', '${row[2]}', ${parseInt(row[3])}, '${row[4]}', '${row[5]}', ${parseInt(row[6])}, '${row[7]}', '${row[8]}', ${parseInt(row[9])}, ${parseInt(row[10])}, '${row[11]}')`,
      );
    })
}
function populatePosts() {
  fs.createReadStream("../db/sample-data/post-sample.csv")
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", function (row) { 
      connection.query(
        `INSERT INTO posts VALUES (${parseInt(row[0])}, ${parseInt(row[2])}, ${isNaN(parseInt(row[1])) ? null : parseInt(row[1])}, '${row[3]}', '${row[4]}')`,
      );
    })
}
function populateLikes() {
  fs.createReadStream("../db/sample-data/like-sample.csv")
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", function (row) { 
      connection.query(
        `INSERT INTO likes VALUES (${parseInt(row[0])}, ${parseInt(row[1])}, ${parseInt(row[2])}, '${row[3]}')`,
      );
    })
}
function populateComments() {
  fs.createReadStream("../db/sample-data/comment-sample.csv")
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", function (row) { 
      connection.query(
        `INSERT INTO comments VALUES (${parseInt(row[0])}, ${parseInt(row[1])}, ${parseInt(row[2])}, '${row[3]}', '${row[4]}')`,
      );
    })
}
function populateFavourites() {
  fs.createReadStream("../db/sample-data/favourite-sample.csv")
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", function (row) { 
      connection.query(
        `INSERT INTO favourites VALUES (${parseInt(row[0])}, ${parseInt(row[1])}, ${parseInt(row[2])}, '${row[3]}')`,
      );
    }) 
}
deleteTables()

setTimeout(function() {
  createTables();
}, 100)

setTimeout(function() {
  populateUsers();
}, 500)

setTimeout(function() {
  populateRecipes();
}, 1000)

setTimeout(function() {
  populatePosts();
}, 1500)

setTimeout(function() {
  populateLikes();
}, 2000)

setTimeout(function() {
  populateComments();
}, 2500)

setTimeout(function() {
  populateFavourites();
  console.log("Populated tables with sample data!")
}, 3000)