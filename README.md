# EasyBytes

EasyBytes is a social recipe sharing platform that allows users to search for their favourite foods. We are on a mission to enable all home cooks to have easy access to recipes so they don’t have an excuse to not cook and enable them to try out new cuisines. The web based application will host a large number of recipes from varying global cuisines.

![EasyBytesLogo](https://user-images.githubusercontent.com/65190493/214759224-2ca6f9b6-a8b6-4b7c-9a8f-bf91a9ab50f5.png)

This repo contains the initial set up of the database project "EasyBytes" for CS348

# Team Members:
- Dhir Patel
- Guneet Bola
- Richa Dalal
- Soham Shah

# Create a local instance of the database

We wil be using a mySQL database.

1) Download MySQL server and MySQL workbench and configure them.
2) Access the mySQL shell using the terminal

```mysql –u username –p (if you set up a password for root, you will be prompted for it)```

3) Create the recipes database

```CREATE DATABASE recipe_db;```

4) Change the current working database to recipe_db

```USE recipe_db;```

# How to create sample database and load sample data

## Create local instance of recipe_db:

**IMPORTANT:** Follow the instructions under the "Create a local instance of the database" section to get a local instance running before moving to the "Populate database with sample data" section

## Populate database with sample data

The backend connects to the local instance of your MySQL server using the following code:

```
const connection = mysql2.createConnection({
  host: 'localhost',
  port: 3306,
  database: 'recipe_db',
  user: 'root',
  password: 'root'
});
```
Note: You need to replace the password and user in the connection object above with the password and username you have set on your local machine

There is a file under the server folder named **populate-db-sample-data.js** which will use the createsampletables.sql file to create the required tables as well as populate the tables with the sample data which can be found [here](./db/sample-data)

To populate the tables with sample data, run the following commands:

```
cd server
npm i
node populate-db-sample-data.js
```

Once, you see the following output on the console ```Populated tables with sample data!```,  run the command, ```Ctrl + C``` to end the process

# How to create production database and load production data

Recipe data was retrieved from https://spoonacular.com/ API using GET requests

Refer to **ApiDataParser.py** to review how production data was retrieved, cleaned and imported into the recipes.csv file

## Create local instance of recipe_db:

**IMPORTANT:** Follow the instructions under the "Create a local instance of the database" section to get a local instance running before moving to the "Populate database with production data" section

## Populate database with production data

The backend connects to the local instance of your MySQL server using the following code:

```
const connection = mysql2.createConnection({
  host: 'localhost',
  port: 3306,
  database: 'recipe_db',
  user: 'root',
  password: 'root'
});
```
Note: You need to replace the password and user in the connection object above with the password and username you have set on your local machine

There is a file under the server folder named **populate-db-production-data.js** which will use the createproductiontables.sql file to create the required tables and views as well as populate the tables with the production data which can be found [here](./db/production-data)

To populate the tables with production data, run the following commands:

```
cd server
npm i
node populate-db-production-data.js
```

Once, you see the following output on the console ```Populated tables with sample data!```,  run the command, ```Ctrl + C``` to end the process

# How to run the Frontend and Backend

To run the frontend:
- First, clone the entire repo in an IDE of your choice in your local computer.
- Then, open the terminal and navigate to the client/ directory. ```cd client```
- Download all the neccessary dependencies using the following command: ```npm i```
- In the terminal, type the following command to startup the frontend: ```npm start```
- The frontend will run on port 3000

To run the backend:
- First, clone the entire repo in an IDE of your choice in your local computer.
- Then, open the terminal and navigate to the server/ directory. ```cd server```
- Download all the neccessary dependencies using the following command: ```npm i```
- Before running the backend, ensure to have completed the steps to either populate the sample or production database
- In the terminal, type the following command to startup the backend: ```npm start```
- The backend service will run on port 5000
- Once the backend has started, it will spin up a local connection with MySQL which will run on port 3306

Note: You need to have both the frontend and backend running simultaneously

# Features currently supported by Application
- R6: Show all recipe posts
- R7: Create a new recipe
- R8: View recipes based on custom criteria
- R9: User login and show user profile
- R10: Update a recipe made by user
- R11: Delete a recipe made by user
- Additional feature - R18: User Registration
- Additional feature - R19: Like Recipe
- Additional feature - R20: Comment on Recipe
- Additional feature - R21: Favourite Recipe
- Additional feature - R22: Recipe Suggestions Based off User Preferences

