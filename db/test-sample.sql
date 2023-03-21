-- This file contains example queries for the feature of our application over the sample database

/* 
Feature (R6): Show all recipe posts
*/

SELECT * FROM recipes JOIN users ON recipes.user_id = users.user_id;

/* 
Feature (R7): Create new recipe posts
Example: Post a Peanut Butter Sandwich
*/

INSERT INTO recipes(user_id, dish_name, cuisine, cook_time, ingredients, instructions, calories, meal_type, health_label, health_score, servings, recipe_picture, date_created, date_modified) VALUES (301, 'Peanut Butter Sandwich', 'American', 5, 'peanut butter|bread', '1) Toast 2 slices of bread|2) Spread peanut butter on 1 side of 1 slice|3) Put the other slice on top of the slice of bread with peanut butter|4) Serve and enjoy', 50, 'breakfast', 'vegetarian', 30, 1, 'https://www.allrecipes.com/thmb/y6DLdlPjzMsKztstkBc8eE2DBik=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/9334336-4612d36a81f34f60a0191f7e470092b6.jpg', '2023-03-01 13:27:44', '2023-03-01 13:27:44');

/* 
Feature (R8): View recipes based on custom criteria
*/

SELECT * FROM recipes JOIN users ON recipes.user_id = users.user_id WHERE health_label LIKE '%vegan%';

SELECT * FROM recipes JOIN users ON recipes.user_id = users.user_id ORDER BY cook_time ASC;

SELECT * FROM recipes JOIN users ON recipes.user_id = users.user_id WHERE cuisine LIKE '%Italian%' ORDER BY calories DESC;

/* 
Feature (R9): Login user by authenticating username and password and show user profile details
*/

-- Authenticate User on credentials
SELECT user_id FROM users WHERE users.user_name = 'guneet_21' AND users.user_password = '$2y$10$xCbdsMtctekBrazrDFugh.zgSoF05TNWt/vcg1XhSnSdwklQl6rOK';

-- Show user profile details
SELECT * FROM users WHERE users.user_id = 303;

/* 
Feature (R10): Update Recipe post posted by the current users
*/

UPDATE recipes SET dish_name='lasagna', cuisine='italian', cook_time=45, ingredients='cheese|pasta|gravy', instructions='step1|step2|step3', date_modified='2023-03-01 13:27:44' WHERE recipe_id = 102;

/* 
Feature (R11): Delete Recipe post posted by the current user
*/

DELETE FROM recipes WHERE recipe_id = 111;

/* 
Feature (R18): Create a new user (sign-up)
*/

INSERT INTO users(user_name, user_password, first_name, last_name, user_picture, preference_one, preference_two, preference_three) VALUES ('john101', '$2y$10$1jVrIExJ1rPxlHHa98.ILeDdiL/H002HcRYQHpKasnlCOFxoTE8iq', 'John', 'Smith', null, null, null, null);

/* 
Feature (R19): Like Recipe Posts
*/

-- User likes a post
INSERT INTO likes(recipe_id, user_id, date_created) VALUES (104, 302, '2023-03-01 13:27:44');

-- Display the number of likes for post 201:
SELECT COUNT(*) AS like_count FROM likes where recipe_id = 101;


/* 
Feature (R20): Comment on Recipe Posts
*/

-- User comments on a post
INSERT INTO comments(recipe_id, user_id, content, date_created) VALUES (104, 302, 'This is a test', '2023-03-01 13:27:44');

-- Display all the comments for a post:
SELECT user_id, content FROM comments where recipe_id = 104;

/* 
Feature (R21): Favourite Recipe Posts
*/

-- User favourites a post
INSERT INTO favourites(recipe_id, user_id, date_created) VALUES (104, 302, '2023-03-01 13:27:44');

-- Display all favourited posts for a user
SELECT * FROM recipes JOIN favourites ON recipes.recipe_id = favourites.recipe_id WHERE favourites.user_id = 301;


