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

## Create a local instance of the database

We wil be using a mySQL database.

1) Download MySQL server and MySQL workbench and configure them.
2) Access the mySQL shell using the terminal

```mysql –u username –p (if you set up a password for root, you will be prompted for it)```

3) Create the recipes database

```CREATE DATABASE recipe_db;```

4) Change the current working database to recipe_db

```USE recipe_db;```

5) Grant the root user all privileges to the recipe_db

```GRANT ALL PRIVILEGES ON recipe_db . * TO 'root'@'localhost';```

## Populate database with sample data

The backend connects to the local instance of your MySQL server using the following code:

```const connection = mysql2.createConnection({
  host: 'localhost',
  port: 3306,
  database: 'recipe_db',
  user: 'root',
  password: 'root'
});```

Note: You need to replace the password and user in the connection object above with the password and username you have set on your local machine

There is a file under the server folder named populate-db-sample-data.js which will use the createtables.sql file to create the required tables as well as populate the tables with the sample data which can be found [here](./db/sample-data)

To populate the tables with sample data, run the following commands:
```cd server```
```npm i```
```node populate-db-sample-data.js```

Once, you see the following output on the console ```Populated tables with sample data!"```, run the command, ```Ctrl + C```

# How to create and load the production database

Recipe data will be retrieved from https://spoonacular.com/ using a GET request\
There will be a Python script that gets the data, formats it and pushes to the desired table in the database

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
- In the terminal, type the following command to startup the backend: ```npm start```
- The backend service will run on port 5000
- Once the backend has started, it will spin up a local connection with MySQL which will run on port 3306 and will populate the db with all the sample data.

# Features currently supported by Application
- Show all recipe posts
- Create new recipe post
- Delete recipe post made by User
- View recipes based on custom criteria
