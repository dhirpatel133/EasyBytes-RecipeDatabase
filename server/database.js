import mysql2 from "mysql2";

// create connection to local db
const connection = mysql2.createConnection({
  host: "localhost",
  port: 3306,
  database: "recipe_db",
  user: "root",
  password: "mysqlroot", // replace this password with the password for you root user
});

connection.connect(function (err) {
  if (err) {
    console.log("error occurred while connecting");
    console.log(err);
  } else {
    console.log("connection with MySQL successful");
  }
});

export default connection;
