import express from 'express';
import mysql2 from 'mysql2'
import cors from 'cors';
import fs from 'fs'
import { parse } from 'csv-parse';
import readline from 'readline'
import { populateTables } from './sample-populate-db.js';

//Bcrypt

const connection = mysql2.createConnection({
  host: 'localhost',
  port: 3306,
  database: 'recipe_db',
  user: 'root',
  password: 'root'
});

connection.connect(function (err) {
  if(err){
      console.log("error occurred while connecting");
      console.log(err)
  }
  else{
      console.log("connection created with Mysql successfully");
  }
});

populateTables(connection);

const app = express()
const port = 5000

app.use(cors())

app.get('/', (req, res) => {
  //res.send('Backend: Hello World!')
  connection.query(
    'SELECT name, cuisine FROM recipes',
    function(err, results, fields) {
      res.send(results); // results contains rows returned by server
    }
  );
})

app.get('/hi', (req, res) => {
  //res.send('Backend: Hello World!')
  connection.query(
    'SHOW tables',
    function(err, results, fields) {
      res.send(results); // results contains rows returned by server
    }
  );
})

/*app.get('/test', (req, res) => {
  //res.send('Backend: Hello World!')
  fs.createReadStream("../db/sample-data/post-sample.csv")
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", function (row) { 
      connection.query(
        `INSERT INTO posts VALUES (${row[0]}, ${row[1]}, ${row[2]}, '${row[3]}', '${row[4]}')`,
      );
    })
})*/

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
