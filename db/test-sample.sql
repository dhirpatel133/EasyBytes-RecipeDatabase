-- This file contains example queries for the feature of our application

/* 
Feature: Show all recipe posts
*/

SELECT * FROM recipes JOIN posts ON recipes.recipe_id = posts.recipe_id;

/* 
Feature: Show all recipe posts
Example: Post a Peanut Butter Sandwich
*/

INSERT INTO recipes VALUE (120, 'Peanut Butter Sandwich', 'American', 5, 'peanut butter|bread', '1) Toast 2 slices of bread|2) Spread peanut butter on 1 side of 1 slice|3) Put the other slice on top of the slice of bread with peanut butter|4) Serve and enjoy', 50, 'breakfast', 'vegetarian', 30, 1, 'https://www.allrecipes.com/thmb/y6DLdlPjzMsKztstkBc8eE2DBik=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/9334336-4612d36a81f34f60a0191f7e470092b6.jpg');
INSERT INTO posts VALUE (220, 120, 301, '2023-03-01 13:27:44', '2023-03-01 13:27:44');

/* 
Feature: Create a new user (sign-up)
*/

INSERT INTO users VALUE(305, 'john101', '$2y$10$1jVrIExJ1rPxlHHa98.ILeDdiL/H002HcRYQHpKasnlCOFxoTE8iq', 'John', 'Smith', null, null, null, null);

/* 
Feature: Login user by authenticating username and password and show user profile details
*/

-- Authenticate User on credentials
SELECT user_id FROM users WHERE users.user_name = 'guneet_21' AND users.user_password = '$2y$10$xCbdsMtctekBrazrDFugh.zgSoF05TNWt/vcg1XhSnSdwklQl6rOK';

-- Show user profile details
SELECT * FROM users WHERE users.user_id = 303;

/* 
Feature: View recipes based on custom criteria
*/

SELECT * FROM recipes JOIN posts ON recipes.recipe_id = posts.recipe_id WHERE health_label LIKE '%vegan%';

SELECT * FROM recipes JOIN posts ON recipes.recipe_id = posts.recipe_id ORDER BY cook_time ASC;

SELECT * FROM recipes JOIN posts ON recipes.recipe_id = posts.recipe_id WHERE cuisine LIKE '%Italian%' ORDER BY calories DESC;


/* 
Feature: Update Recipe Post posted by the current users
*/

UPDATE posts SET date_modified='2023-03-01 13:27:44' WHERE post_id = 202;
UPDATE recipes SET dish_name='lasagna', cuisine='italian', cook_time=45, ingredients='cheese|pasta|gravy', instructions='step1|step2|step3' WHERE recipe_id = 102;

/* 
Feature: Delete Recipe Post posted by the current user
*/

DELETE FROM posts WHERE post_id = 202;
DELETE FROM Recipes WHERE recipe_id = 102;


/* 
Feature: Like Recipe Posts
*/

-- User likes a post
INSERT INTO likes VALUE (409, 204, 302, '2023-03-01 13:27:44');

-- Display the number of likes for post 201:
SELECT COUNT(*) AS like_count FROM likes where post_id = 201;


/* 
Feature: Comment on Recipe Posts
*/

-- User comments on a post
INSERT INTO comments VALUE (509, 204, 302, 'This is a test', '2023-03-01 13:27:44');

-- Display all the comments for a post:
SELECT user_id, content FROM comments where post_id = 201;

/* 
Feature: Favourite Recipe Posts
*/

-- User favourites a post
INSERT INTO favourites VALUE (609, 204, 302, '2023-03-01 13:27:44');

-- Display all favourited posts for a user
SELECT * FROM recipes JOIN posts ON recipes.recipe_id = posts.recipe_id JOIN favourites ON posts.post_id = favourites.post_id WHERE favourites.user_id = 301;


