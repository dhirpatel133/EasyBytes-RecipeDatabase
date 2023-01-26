import express from 'express';
import mysql2 from 'mysql2'
import cors from 'cors';

const app = express()
const port = 5000

app.use(cors())

const connection = mysql2.createConnection({
  host: 'localhost',
  port: 3306,
  database: 'sample_db',
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

app.get('/', (req, res) => {
  //res.send('Backend: Hello World!')
  connection.query(
    'SELECT name FROM student',
    function(err, results, fields) {
      res.send(results); // results contains rows returned by server
    }
  );
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
