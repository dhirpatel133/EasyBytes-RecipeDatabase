# EasyBytes

EasyBytes is a social recipe sharing platform that allows users to search for their favourite foods. We are on a mission to enable all home cooks to have easy access to recipes so they don’t have an excuse to not cook and enable them to try out new cuisines. The web based application will host a large number of recipes from varying global cuisines.

![EasyBytesLogo](https://user-images.githubusercontent.com/65190493/214759224-2ca6f9b6-a8b6-4b7c-9a8f-bf91a9ab50f5.png)

This repo contains the initial set up of the database project "EasyBytes" for CS348

# Team Members:
- Dhir Patel
- Guneet Bola
- Richa Dalal
- Soham Shah

# How to create and load the sample database

We wil be using a mySQL database.

1) Download MySQL server and MySQL workbench and configure them.
2) Access the mySQL shell using the terminal

```mysql –u username –p```

3) Ensure that you have the correct flags set to 1 (to allow file imports)

```OPT_LOCAL_INFILE=1```

Run the command: ```SET GLOBAL local_infile=1``` if needed

4) Create the recipes database in MySQL

```CREATE DATABASE recipe_db;```

3) Create the recipes table to import the CSV file.

To choose a database:

```USE recipe_db;```

To create the table:

```
CREATE TABLE recipes
  ( 
     id     DECIMAL(9, 0) NOT NULL PRIMARY KEY, 
     name    VARCHAR(30), 
     cuisine    VARCHAR(30), 
     ingredients VARCHAR(100), 
     steps      VARCHAR(100) 
  );
  ```

4) Import the CSV file into the SQL table that was made.

```
LOAD DATA LOCAL INFILE '/Users/owner/Desktop/cs348/project/codesample/Database/testdb/recipe.csv' 
	INTO TABLE recipes 
	FIELDS TERMINATED BY ',' 
	ENCLOSED BY '"'
	LINES TERMINATED BY '\n';
```
  
5) Database has been created and loaded to the sample platform. Refer to the db/Creating_Loading_Recipe.sql which will create the table and load information from recipe.csv.

# How to create and load the production database

Recipe data will be retrieved from https://spoonacular.com/ using a GET request\
There will be a Python script that gets the data, formats it and pushes to the desired table in the database

# How to run the Frontend and Backend

To run the frontend:
- First, clone the entire repo in an IDE of your choice in your local computer.
- Then, open the terminal and navigate to the client/ directory. (cd client)
- In the terminal, type the following command to startup the frontend: npm start
- The frontend will run on port 3000

To run the backend:
- First, clone the entire repo in an IDE of your choice in your local computer.
- Then, open the terminal and navigate to the server/ directory. (cd server)
- In the terminal, type the following command to startup the backend: npm start
- The backend service will run on port 5000
- Once the backend has started, it will spin up a local connection with MySQL which will run on port 3306 to store/fetch data from the db.
