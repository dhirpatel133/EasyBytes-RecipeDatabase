CREATE TABLE IF NOT EXISTS users (user_id INT NOT NULL, user_name VARCHAR(50) UNIQUE NOT NULL, user_password VARCHAR(200) NOT NULL, first_name VARCHAR(50) NOT NULL, last_name VARCHAR(50) NOT NULL, user_picture VARCHAR(8000), preference_one VARCHAR(50), preference_two VARCHAR(50), preference_three VARCHAR(50), PRIMARY KEY (user_id));
CREATE TABLE IF NOT EXISTS recipes (recipe_id INT NOT NULL, dish_name VARCHAR(50) NOT NULL, cuisine VARCHAR(200) NOT NULL, cook_time INT NOT NULL, ingredients VARCHAR(5000) NOT NULL, instructions VARCHAR(5000) NOT NULL, calories INT NOT NULL, meal_type VARCHAR(200), health_label VARCHAR(200), health_score INT, servings INT, recipe_picture VARCHAR(5000), PRIMARY KEY (recipe_id)); 
CREATE TABLE IF NOT EXISTS posts (post_id INT NOT NULL, recipe_id INT NOT NULL, user_id INT, date_created DATETIME, date_modified DATETIME, PRIMARY KEY (post_id), FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id) ON DELETE CASCADE, FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE); 
CREATE TABLE IF NOT EXISTS likes (like_id INT NOT NULL, post_id INT NOT NULL, user_id INT NOT NULL, date_created DATETIME, PRIMARY KEY (like_id, post_id, user_id), FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE, FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE);
CREATE TABLE IF NOT EXISTS comments (comment_id INT NOT NULL, post_id INT NOT NULL, user_id INT NOT NULL, content VARCHAR(144) NOT NULL, date_created DATETIME, PRIMARY KEY (comment_id, post_id, user_id), FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE, FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE);
CREATE TABLE IF NOT EXISTS favourites (favourite_id INT NOT NULL, post_id INT NOT NULL, user_id INT NOT NULL, date_created DATETIME, PRIMARY KEY (favourite_id, post_id, user_id), FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE, FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE);