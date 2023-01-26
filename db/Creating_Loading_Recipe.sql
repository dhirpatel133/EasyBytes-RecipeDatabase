CREATE DATABASE recipe_db;

USE recipe_db;
CREATE TABLE recipes
  ( 
     id     DECIMAL(9, 0) NOT NULL PRIMARY KEY, 
     name    VARCHAR(30), 
     cuisine    VARCHAR(30), 
     ingredients VARCHAR(100), 
     steps      VARCHAR(100) 
  );

USE recipe_db;
  LOAD DATA LOCAL INFILE '/Users/owner/Desktop/cs348/project/codesample/Database/testdb/recipe.csv' 
	INTO TABLE recipes
	FIELDS TERMINATED BY ',' 
	ENCLOSED BY '"'
	LINES TERMINATED BY '\n';