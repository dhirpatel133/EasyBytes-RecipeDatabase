import express from "express";
import mysql2 from "mysql2";
import cors from "cors";
import bcrypt from "bcrypt";

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
    console.log("connection created with Mysql successfully");
  }
});

//populateTables(connection);

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to EasyBytes API!");
});

app.get("/getAllPosts", (req, res) => {
  //res.send('Backend: Hello World!')
  connection.query(
    "SELECT * FROM recipes JOIN posts ON recipes.recipe_id = posts.recipe_id LEFT OUTER JOIN users ON posts.user_id = users.user_id;",
    function (err, results) {
      res.send(results); // results contains rows returned by server
    }
  );
});

app.get("/test", (req, res) => {
  //res.send('Backend: Hello World!')
  connection.query("SHOW tables", function (err, results) {
    res.send(results); // results contains rows returned by server
  });
});

app.get("/getCustomPosts", (req, res) => {
  let filterCategory = req.query.filterCategory;
  let filterValue = req.query.filterValue;
  let sortValue = req.query.sortValue;
  let baseQuery =
    "SELECT * FROM recipes JOIN posts ON recipes.recipe_id = posts.recipe_id LEFT OUTER JOIN users ON posts.user_id = users.user_id";
  let filterOnlyQuery = " WHERE ";
  let sortOnlyQuery = ` ORDER BY ${sortValue}`;
  //let filterAndSortQuery = `SELECT * FROM recipes JOIN posts ON recipes.recipe_id = posts.recipe_id WHERE ${filterCategory} LIKE '%${filterValue}%' ORDER BY ${sortCategory} ${sortValue}`
  let finalQuery = baseQuery;

  if (filterCategory && filterValue && sortValue === undefined) {
    let filterCategories = filterCategory.split(",");
    let filterValues = filterValue.split(",");
    finalQuery += filterOnlyQuery;
    for (let i = 0; i < filterCategories.length; i++) {
      finalQuery += `${filterCategories[i]} LIKE '%${filterValues[i]}%'`;
      if (i != filterCategories.length - 1) {
        finalQuery += " AND ";
      }
    }
  } else if (
    filterCategory === undefined &&
    filterValue === undefined &&
    sortValue
  ) {
    finalQuery += sortOnlyQuery;
  } else if (filterCategory && filterValue && sortValue) {
    let filterCategories = filterCategory.split(",");
    let filterValues = filterValue.split(",");
    finalQuery += filterOnlyQuery;
    for (let i = 0; i < filterCategories.length; i++) {
      finalQuery += `${filterCategories[i]} LIKE '%${filterValues[i]}%'`;
      if (i != filterCategories.length - 1) {
        finalQuery += " AND ";
      }
    }
    finalQuery += sortOnlyQuery;
  }

  connection.query(finalQuery, function (err, results, fields) {
    res.send(results); // results contains rows returned by server
  });
});

let currentTime = new Date();
let mySQLTime = new Date(
  currentTime.getFullYear(),
  currentTime.getMonth(),
  currentTime.getDate(),
  currentTime.getHours() - currentTime.getTimezoneOffset() / 60,
  currentTime.getMinutes(),
  currentTime.getSeconds(),
  currentTime.getMilliseconds()
)
  .toISOString()
  .slice(0, 19)
  .replace("T", " ");

app.get("/createPost", (req, res) => {
  // put error checking
  let dishName = req.query.dishName;
  let cuisine = req.query.cuisine;
  let cookTime = req.query.cookTime;
  let ingredients = req.query.ingredients;
  let instructions = req.query.instructions;
  let calories = req.query.calories;
  let mealType = req.query.mealType;
  let healthLabel = req.query.healthLabel;
  let healthScore = req.query.healthScore;
  let servings = req.query.servings;
  let picture = req.query.picture;
  let userID = req.query.userID;
  let createdAt = mySQLTime;
  let updatedAt = mySQLTime;
  console.log(recipeID, postID);
  console.log(createdAt, updatedAt);
  connection.query(
    `INSERT INTO recipes(name, cuisine, cook_time, ingredients, instructions, calories, meal_type, health_label, health_score, servings, recipe_picture) VALUE ('${dishName}', '${cuisine}', ${cookTime}, '${ingredients}', '${instructions}', ${calories}, '${mealType}', '${healthLabel}', ${healthScore}, ${servings}, '${picture}');`,
    function (err, results, fields) {
      connection.query(
        `INSERT INTO posts(recipe_id, user_id, created_date, modified_date) VALUE (${recipeID}, ${userID}, '${createdAt}', '${updatedAt}');`,
        function (err, results, fields) {
          console.log(results);
          res.send(results);
        }
      );
    }
  );
});

app.get("/deletePost", (req, res) => {
  let post_id = req.query.postid;

  connection.query(
    `DELETE FROM recipes WHERE recipe_id = (SELECT recipe_id FROM posts WHERE post_id = ${post_id});`,
    function (err, results, fields) {
      res.send(results);
    }
  );
});

// insert new user into the users table
app.post("/register", async (req, res) => {
  let userName = req.body.userName;
  let password = req.body.password;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;

  const hash = await bcrypt.hash(password, 7);

  let insertUserQuery = `INSERT INTO users (user_name, user_password, first_name, last_name, 
    user_picture, preference_one, preference_two, preference_three) VALUES (?, ?, ?, ?, null, null, null, null);`;

  connection.query(
    insertUserQuery,
    [userName, hash, firstName, lastName],
    (err, result, fields) => {
      // if there's an error inserting, then prompt the user to try again
      if (err) {
        console.log(err);
        res.send("invalid");
      } else {
        res.send("valid");
      }
    }
  );
});

// validate existing user logging in
app.post("/login", async (req, res) => {
  let userName = req.body.userName;
  let password = req.body.password;
  let insertUserQuery = `SELECT * FROM users WHERE user_name = ?`;

  const hash = await bcrypt.hash(password, 7);

  connection.query(insertUserQuery, [userName], async (err, result, fields) => {
    // if there's an error getting the user, then prompt the user to try again - user most likely not registered
    if (err) {
      res.send("invalid");
    } else {
      if (result.length > 0) {
        const isMatch = await bcrypt.compare(password, result[0].user_password);
        if (isMatch) {
          res.send(result);
        } else {
          res.send("invalid");
        }
      } else {
        res.send("invalid");
      }
    }
  });
});

// fetch user data
app.post("/userData", (req, res) => {
  let userID = req.body.userID;
  let fetchUserQuery = `SELECT * FROM recipe_db.publicuserinfo WHERE user_id = ?`;

  connection.query(fetchUserQuery, [userID], (err, result, fields) => {
    // if there's an error getting the user, then prompt the user to try again - user most likely not registered
    if (err) {
      res.send("invalid");
    } else {
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send("invalid");
      }
    }
  });
});

// fetch user data
app.post("/updateUserData", (req, res) => {
  let userID = req.body.userID;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let preferenceOne = req.body.preferenceOne;
  let preferenceTwo = req.body.preferenceTwo;
  let preferenceThree = req.body.preferenceThree;
  let userPicture = req.body.userPicture;
  let updateUserQuery = `UPDATE recipe_db.publicuserinfo SET first_name = ?, last_name = ?, 
  preference_one = ?, preference_two = ?, preference_three = ?, user_picture = ? WHERE user_id = ?`;

  connection.query(
    updateUserQuery,
    [
      firstName,
      lastName,
      preferenceOne,
      preferenceTwo,
      preferenceThree,
      userPicture,
      userID,
    ],
    (err, result, fields) => {
      // if there's an error getting the user, then prompt the user to try again - user most likely not registered
      if (err) {
        res.send("invalid");
      } else {
        if (result.affectedRows > 0) {
          res.send(result);
        } else {
          res.send("invalid");
        }
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
