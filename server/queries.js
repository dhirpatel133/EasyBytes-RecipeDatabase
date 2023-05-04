// custom sql queries for operations on the DB and frontend

export const allPosts = `SELECT recipe_id, dish_name, cuisine, cook_time, ingredients, instructions,
                    calories, meal_type, health_label, health_score, servings, recipe_picture,
                    date_modified, first_name, last_name 
                    FROM recipes JOIN users ON recipes.user_id = users.user_id LIMIT 30`;

export const userPosts = `SELECT * FROM recipes WHERE recipes.user_id = ?`;

export const newRecipe = `INSERT INTO recipes (user_id, dish_name, cuisine, cook_time, ingredients, instructions,
                    calories, meal_type, health_label, health_score, servings, recipe_picture)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

export const updatePosts = `UPDATE recipes SET dish_name = ?, cuisine = ?, cook_time = ?, ingredients = ?,
                    instructions = ?, calories = ?, meal_type = ?, health_label = ?,
                    health_score = ?, servings = ?, recipe_picture = ? WHERE recipe_id = ?`;

export const deleteRecipes = `DELETE FROM recipes WHERE recipe_id = ?`;

export const registerUser = `INSERT INTO users (user_name, user_password, first_name, last_name, user_picture,
                    preference_one, preference_two, preference_three) 
                    VALUES (?, ?, ?, ?, null, null, null, null)`;

export const loginUser = `SELECT user_id, user_password FROM users WHERE user_name = ?`;

export const userData = `SELECT * FROM publicuserinfo WHERE user_id = ?`;

export const updateUserData = `UPDATE publicuserinfo SET first_name = ?, last_name = ?, preference_one = ?, 
                        preference_two = ?, preference_three = ?, user_picture = ? WHERE user_id = ?`;

export const numberOfLikes = `SELECT COUNT(*) AS like_count FROM likes where recipe_id = ?`;

export const usersLiked = `SELECT user_id FROM likes where recipe_id = ?`;

export const insertLikes = `INSERT INTO likes(recipe_id, user_id) VALUES (?, ?)`;

export const removeLike = `DELETE FROM likes WHERE recipe_id = ? AND user_id = ?`;

export const favouriteRecipes = `SELECT * FROM recipes JOIN favourites ON recipes.recipe_id = favourites.recipe_id
                    JOIN users ON users.user_id = recipes.user_id WHERE favourites.user_id = ?`;

export const favouriteRecipeIds = `SELECT recipe_id FROM favourites where user_id = ?`;

export const newFavourite = `INSERT INTO favourites(recipe_id, user_id) VALUES (?, ?)`;

export const removeFavourite = `DELETE FROM favourites WHERE recipe_id = ? AND user_id = ?`;

export const getComments = `SELECT * from comments JOIN users WHERE users.user_id = comments.user_id AND
                    recipe_id = ?`;

export const newComment = `INSERT INTO comments (user_id, recipe_id, content) VALUES (?, ?, ?)`;
