import express from 'express';
import mysql2 from 'mysql2'
import cors from 'cors';

//Bcrypt

function generateRandomUUID(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const connection = mysql2.createConnection({
  host: 'localhost',
  port: 3306,
  database: 'recipe_db',
  user: 'root',
  password: 'root' // replace this password with the password for you root user
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

//populateTables(connection);

const app = express()
const port = 5000

app.use(cors())

app.get('/', (req, res) => {
  res.send('Welcome to EasyBytes API!')
})

app.get('/getAllPosts', (req, res) => {
  //res.send('Backend: Hello World!')
  connection.query(
    'SELECT * FROM recipes JOIN posts ON recipes.recipe_id = posts.recipe_id',
    function(err, results) {
      res.send(results); // results contains rows returned by server
    }
  );
})

app.get('/test', (req, res) => {
  //res.send('Backend: Hello World!')
  connection.query(
    'SHOW tables',
    function(err, results) {
      res.send(results); // results contains rows returned by server
    }
  );
})

app.get('/getCustomPosts', (req, res) => {
  
  let filterCategory = req.query.filterCategory
  let filterValue = req.query.filterValue
  let sortValue = req.query.sortValue
  let baseQuery = "SELECT * FROM recipes JOIN posts ON recipes.recipe_id = posts.recipe_id"
  let filterOnlyQuery = " WHERE "
  let sortOnlyQuery = ` ORDER BY ${sortValue}`
  //let filterAndSortQuery = `SELECT * FROM recipes JOIN posts ON recipes.recipe_id = posts.recipe_id WHERE ${filterCategory} LIKE '%${filterValue}%' ORDER BY ${sortCategory} ${sortValue}`
  let finalQuery = baseQuery;
  
  if (filterCategory && filterValue && sortValue === undefined) {
    let filterCategories = filterCategory.split(',')
    let filterValues = filterValue.split(',')
    finalQuery += filterOnlyQuery
    for (let i = 0; i < filterCategories.length; i++) {
      finalQuery += `${filterCategories[i]} LIKE '%${filterValues[i]}%`
      if (i != filterCategories.length - 1) {
        finalQuery += " AND "
      }
    }
  }
  else if (filterCategory === undefined && filterValue === undefined && sortValue) {
    finalQuery += sortOnlyQuery
  }
  else if (filterCategory && filterValue && sortValue) {
    let filterCategories = filterCategory.split(',')
    let filterValues = filterValue.split(',')
    finalQuery += filterOnlyQuery
    for (let i = 0; i < filterCategories.length; i++) {
      finalQuery += `${filterCategories[i]} LIKE '%${filterValues[i]}%'`
      if (i != filterCategories.length - 1) {
        finalQuery += " AND "
      }
    }
    finalQuery += sortOnlyQuery
  }
  console.log(finalQuery)

  connection.query(
    finalQuery,
    function(err, results, fields) {
      res.send(results); // results contains rows returned by server
    }
  );

})

/*let currentTime = new Date()
let mySQLTime = new Date(
  currentTime.getFullYear(),
  currentTime.getMonth(),
  currentTime.getDate(),
  currentTime.getHours() - currentTime.getTimezoneOffset() / 60,
  (currentTime.getMinutes()),
  currentTime.getSeconds(),
  currentTime.getMilliseconds()
).toISOString().slice(0, 19).replace('T', ' ')
app.get('/createPost', (req, res) => {
  // put error checking
  let recipeID = generateRandomUUID(120, 199);
  let dishName = req.query.dishName
  let cuisine = req.query.cuisine
  let cookTime = req.query.cookTime
  let ingredients = req.query.ingredients
  let instructions = req.query.instructions
  let calories = req.query.calories
  let mealType = req.query.mealType
  let healthLabel = req.query.healthLabel
  let healthScore = req.query.healthScore
  let servings = req.query.servings
  let picture = req.query.picture
  let postID = generateRandomUUID(220, 299);
  let userID = req.query.userID
  let createdAt = mySQLTime
  let updatedAt = mySQLTime
  console.log(recipeID, postID)
  //console.log(createdAt, updatedAt)
  connection.query(
    `INSERT INTO recipes VALUE (${recipeID}, '${dishName}', '${cuisine}', ${cookTime}, '${ingredients}', '${instructions}', ${calories}, '${mealType}', '${healthLabel}', ${healthScore}, ${servings}, '${picture}');`,
    function(err, results, fields) {
      connection.query(
        `INSERT INTO posts VALUE (${postID}, ${recipeID}, ${userID}, '${createdAt}', '${updatedAt}');`,
        function(err, results, fields) {
          console.log(results)
          res.send(results)
        }
      );
    }
  );
})
*/

/*
app.get('/deletePost', (req, res) => {
  
  let post_id = req.query.postid;
  
  connection.query(
    `DELETE FROM recipes WHERE recipe_id = (SELECT recipe_id FROM posts WHERE post_id = ${post_id});`,
    function(err, results, fields) {
      res.send(results)
    }
  );
})*/

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})