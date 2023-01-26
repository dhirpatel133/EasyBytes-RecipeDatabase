USE sample_db;
CREATE TABLE recipe
  ( 
     recipeID     DECIMAL(9, 0) NOT NULL PRIMARY KEY, 
     recipeName    VARCHAR(30), 
     cuisine    VARCHAR(30), 
     ingredients VARCHAR(100), 
     steps      VARCHAR(100) 
  ); 
USE sample_db;
  LOAD DATA LOCAL INFILE '/Users/owner/Desktop/cs348/project/codesample/Database/testdb/recipe.csv' 
	INTO TABLE recipe 
	FIELDS TERMINATED BY ',' 
	ENCLOSED BY '"'
	LINES TERMINATED BY '\n';
    
