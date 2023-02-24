import fs from 'fs'
import { parse } from 'csv-parse';
import readline from 'readline'

function populateTables(connection) {
    var deleteTableQueries = readline.createInterface({
        input: fs.createReadStream("../db/deletetables.sql"),
        terminal: false
       });
      
       deleteTableQueries.on('line', function(chunk){
        connection.query(chunk.toString('ascii'), function(err, sets, fields){
         if(err) console.log(err);
        });
      });
      
    var createTableQueries = readline.createInterface({
        input: fs.createReadStream("../db/createtables.sql"),
        terminal: false
       });
      
       createTableQueries.on('line', function(chunk){
        connection.query(chunk.toString('ascii'), function(err, sets, fields){
         if(err) console.log(err);
        });
      });
      
    fs.createReadStream("../db/sample-data/user-sample.csv")
        .pipe(parse({ delimiter: ",", from_line: 2 }))
        .on("data", function (row) {
          connection.query(
            `INSERT IGNORE INTO users VALUES (${parseInt(row[0])}, '${row[1]}', '${row[2]}', '${row[3]}', '${row[4]}', '${row[5]}', '${row[6]}', '${row[7]}', '${row[8]}')`,
          );
        })
      
    fs.createReadStream("../db/sample-data/recipes-sample.csv")
        .pipe(parse({ delimiter: ",", from_line: 2 }))
        .on("data", function (row) { 
          connection.query(
            `INSERT IGNORE INTO recipes VALUES (${parseInt(row[0])}, '${row[1]}', '${row[2]}', ${parseInt(row[3])}, '${row[4]}', '${row[5]}', ${parseInt(row[6])}, '${row[7]}', '${row[8]}', ${parseInt(row[9])}, ${parseInt(row[10])}, '${row[11]}')`,
          );
        })
      
    fs.createReadStream("../db/sample-data/post-sample.csv")
        .pipe(parse({ delimiter: ",", from_line: 2 }))
        .on("data", function (row) { 
          connection.query(
            `INSERT IGNORE INTO posts VALUES (${parseInt(row[0])}, ${parseInt(row[2])}, ${parseInt(row[1])}, '${row[3]}', '${row[4]}')`,
          );
        })
      
    fs.createReadStream("../db/sample-data/like-sample.csv")
        .pipe(parse({ delimiter: ",", from_line: 2 }))
        .on("data", function (row) { 
          connection.query(
            `INSERT IGNORE INTO likes VALUES (${parseInt(row[0])}, ${parseInt(row[1])}, ${parseInt(row[2])}, '${row[3]}')`,
          );
        })
      
    fs.createReadStream("../db/sample-data/comment-sample.csv")
        .pipe(parse({ delimiter: ",", from_line: 2 }))
        .on("data", function (row) { 
          connection.query(
            `INSERT IGNORE INTO comments VALUES (${parseInt(row[0])}, ${parseInt(row[1])}, ${parseInt(row[2])}, '${row[3]}', '${row[4]}')`,
          );
        })
      
    fs.createReadStream("../db/sample-data/favourite-sample.csv")
        .pipe(parse({ delimiter: ",", from_line: 2 }))
        .on("data", function (row) { 
          connection.query(
            `INSERT IGNORE INTO favourites VALUES (${parseInt(row[0])}, ${parseInt(row[1])}, ${parseInt(row[2])}, '${row[3]}')`,
          );
        })
}

export { populateTables };