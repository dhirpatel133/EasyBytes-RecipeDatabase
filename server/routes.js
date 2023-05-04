import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import connection from "./database.js";
import * as Query from "./queries.js";

// create a backend route
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// API route to retrive all the recipes from the database and return to the frontend
app.get("/getAllPosts", (req, res) => {
  let query = Query.allPosts;
  connection.query(query, (err, results, fields) => {
    // results contains rows returned by server
    res.send(results);
  });
});

// API route to retrive posts made by a specific user
app.get("/getUserPosts", (req, res) => {
  let user_id = req.query.user_id;
  let query = Query.userPosts;
  connection.query(query, [user_id], (err, results, fields) => {
    res.send(results);
  });
});

// API route to retrive all the recipes from the database and return to the frontend
app.get("/getCustomPosts", (req, res) => {
  let filterCategory = req.query.filterCategory;
  let filterValue = req.query.filterValue;
  let sortValue = req.query.sortValue;
  let baseQuery = `SELECT recipe_id, dish_name, cuisine, cook_time, ingredients, instructions, 
      calories, meal_type, health_label, health_score, servings, recipe_picture, date_modified, 
      first_name, last_name FROM recipes JOIN users ON recipes.user_id = users.user_id`;
  let filterOnlyQuery = " WHERE ";
  let sortOnlyQuery = ` ORDER BY ${sortValue}`;
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

// API route to create a new recipes (add new tuple) to the database
app.post("/createPost", (req, res) => {
  let dishName = req.body.recipeName;
  let cuisine = req.body.cuisine;
  let cookTime = req.body.cookTime;
  let ingredients = req.body.ingredients;
  let instructions = req.body.instructions;
  let calories = req.body.calories;
  let mealType = req.body.mealType;
  let healthLabel = req.body.healthLabel;
  let healthScore = req.body.healthScore;
  let servings = req.body.servings;
  let picture = req.body.recipePicture;
  let userID = req.body.userID;
  let query = Query.newRecipe;
  connection.query(
    query,
    [
      userID,
      dishName,
      cuisine,
      cookTime,
      ingredients,
      instructions,
      calories,
      mealType,
      healthLabel,
      healthScore,
      servings,
      picture,
    ],
    (err, result, fields) => {
      if (err) {
        console.log(err);
        res.send("invalid");
      } else {
        res.send("valid");
      }
    }
  );
});

app.put("/updatePost", (req, res) => {
  let dishName = req.body.recipeName;
  let cuisine = req.body.cuisine;
  let cookTime = req.body.cookTime;
  let ingredients = req.body.ingredients;
  let instructions = req.body.instructions;
  let calories = req.body.calories;
  let mealType = req.body.mealType;
  let healthLabel = req.body.healthLabel;
  let healthScore = req.body.healthScore;
  let servings = req.body.servings;
  let picture = req.body.recipePicture;
  let recipeID = req.body.recipeID;
  let query = Query.updatePosts;
  connection.query(
    query,
    [
      dishName.toString(),
      cuisine.toString(),
      cookTime,
      ingredients.toString(),
      instructions.toString(),
      calories,
      mealType.toString(),
      healthLabel.toString(),
      healthScore,
      servings,
      picture.toString(),
      recipeID,
    ],
    (err, result, fields) => {
      if (err) {
        console.log(err);
        res.send("invalid");
      } else {
        res.send("valid");
      }
    }
  );
});

// API route to delete a recipe (add new tuple) to the database
app.delete("/deleteRecipes", (req, res) => {
  let recipe_id = req.query.recipe_id;
  let query = Query.deleteRecipes;
  connection.query(query, [recipe_id], (err, results, fields) => {
    res.send(results);
  });
});

// API route to insert a new user into the users table
app.post("/register", async (req, res) => {
  let userName = req.body.userName;
  let password = req.body.password;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  const hashedPassword = await bcrypt.hash(password, 7);
  let query = Query.registerUser;
  connection.query(
    query,
    [userName, hashedPassword, firstName, lastName],
    (err, result, fields) => {
      if (err) {
        console.log(err);
        res.send("invalid");
      } else {
        res.send("valid");
      }
    }
  );
});

// API route to validate existing user when they are logging in
app.post("/login", async (req, res) => {
  let userName = req.body.userName;
  let password = req.body.password;
  let query = Query.loginUser;
  connection.query(query, [userName], async (err, result, fields) => {
    // if there's an error getting the user, then prompt the user to try again - user most likely not registered
    if (err) {
      res.send("invalid");
    } else {
      if (result.length > 0) {
        const isMatch = await bcrypt.compare(password, result[0].user_password);
        if (isMatch) {
          res.send([result[0].user_id]);
        } else {
          res.send("invalid");
        }
      } else {
        res.send("invalid");
      }
    }
  });
});

// API route to fetch user data of the user who is logged in
app.post("/userData", (req, res) => {
  let userID = req.body.userID;
  let query = Query.userData;
  connection.query(query, [userID], (err, result, fields) => {
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

// API route to update the data for the user currently logged in
app.post("/updateUserData", (req, res) => {
  let userID = req.body.userID;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let preferenceOne =
    req.body.preferenceOne != "None" ? req.body.preferenceOne : null;
  let preferenceTwo =
    req.body.preferenceTwo != "None" ? req.body.preferenceTwo : null;
  let preferenceThree =
    req.body.preferenceThree != "None" ? req.body.preferenceThree : null;
  let userPicture = req.body.userPicture;
  let query = Query.updateUserData;
  connection.query(
    query,
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

// API routes to retrieve the number of likes for a post
app.get("/likes", (req, res) => {
  let recipeID = req.query.recipeID;
  let query = Query.numberOfLikes;
  connection.query(query, [recipeID], (err, results) => {
    res.send(results);
  });
});

// API routes to retrieve all the users who have liked a specific recipe
app.get("/usersLiked", (req, res) => {
  let userIDs = [];
  let recipeID = req.query.recipeID;
  let query = Query.usersLiked;
  connection.query(query, [recipeID], (err, results) => {
    for (let i = 0; i < results.length; ++i) {
      userIDs.push(results[i].user_id);
    }
    res.send(userIDs);
  });
});

// API routes to insert a new like into the likes table when user likes post
app.post("/likes", (req, res) => {
  let recipeID = req.body.recipeID;
  let userID = req.body.userID;
  let query = Query.insertLikes;
  connection.query(query, [recipeID, userID], (err, results) => {
    if (err) {
      res.send("invalid");
    } else {
      res.send("valid");
    }
  });
});

// API routes to delete a like from the likes table when user unlikes post
app.delete("/likes", (req, res) => {
  let recipeID = req.query.recipeID;
  let userID = req.query.userID;
  let query = Query.removeLike;
  connection.query(query, [recipeID, userID], (err, results, fields) => {
    res.send(results);
  });
});

// API routes to retrieve all suggested posts for user based on preferences
app.post("/getSuggestedPosts", (req, res) => {
  if (
    req.body.preferenceOne == null &&
    req.body.preferenceTwo == null &&
    req.body.preferenceThree == null
  ) {
    res.send("none");
    return;
  }
  let baseQuery =
    "SELECT * FROM recipes JOIN users ON recipes.user_id = users.user_id ";
  let conditions = "";
  if (req.body.preferenceOne != null) {
    conditions += `cuisine = '${req.body.preferenceOne}' `;
  }
  if (req.body.preferenceTwo != null) {
    conditions += `AND health_label LIKE '%${req.body.preferenceTwo}%'`;
  }
  if (req.body.preferenceThree != null) {
    conditions += `AND meal_type LIKE '%${req.body.preferenceThree}%' `;
  }
  if (conditions != "") {
    baseQuery += "WHERE ";
  }
  baseQuery = baseQuery + conditions + ";";
  connection.query(baseQuery, function (err, results) {
    if (results.length == 0) {
      res.send("none");
    } else {
      res.send(results); // results contains rows returned by server
    }
  });
});

// API route to retrieve all favourited recipes for a user
app.get("/favourites", (req, res) => {
  let userID = req.query.userID;
  let query = Query.favouriteRecipes;
  connection.query(query, [userID], (err, results) => {
    if (results.length == 0) {
      res.send("none");
    } else {
      res.send(results);
    }
  });
});

// API route to retrieve all recipe_ids favourited by this user
app.get("/postsFavourite", (req, res) => {
  let recipeIDs = [];
  let userID = req.query.userID;
  let query = Query.favouriteRecipeIds;
  connection.query(query, [userID], (err, results) => {
    for (let i = 0; i < results.length; ++i) {
      recipeIDs.push(results[i].recipe_id);
    }
    res.send(recipeIDs);
  });
});

// API routes to insert a new post into favourites when user favourites post
app.post("/favourites", (req, res) => {
  let recipeID = req.body.recipeID;
  let userID = req.body.userID;
  let query = Query.newFavourite;
  connection.query(query, [recipeID, userID], (err, results) => {
    if (err) {
      res.send("invalid");
    } else {
      res.send("valid");
    }
  });
});

// API routes to remove favourite from table when user unfavourites post
app.delete("/favourites", (req, res) => {
  let recipeID = req.query.recipeID;
  let userID = req.query.userID;
  let query = Query.removeFavourite;
  connection.query(query, [recipeID, userID], (err, results) => {
    res.send(results);
  });
});

// API routes to retrieve all comments for a specific recipe
app.get("/getComments", (req, res) => {
  let recipeID = req.query.recipeID;
  let comments = [];
  let query = Query.getComments;
  connection.query(query, [recipeID], (err, results) => {
    for (let i = 0; i < results.length; ++i) {
      comments.push(results[i]);
    }
    res.send(comments);
  });
});

// API routes to insert a new comment into the comments table when a user posts a new comment
app.post("/createComment", (req, res) => {
  let content = req.body.content;
  let userID = req.body.userID;
  let recipeID = req.body.recipeID;
  let query = Query.newComment;
  connection.query(
    query,
    [userID, recipeID, content],
    (err, result, fields) => {
      if (err) {
        console.log(err);
        res.send("invalid");
      } else {
        res.send("valid");
      }
    }
  );
});

export default app;
export { port };
