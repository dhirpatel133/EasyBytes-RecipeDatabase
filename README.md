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

```mysql –u username –p (if you set up a password for root, place it here)```

3) Create the recipes database

```CREATE DATABASE recipe_db;```

4) Change the current working database to recipe_db

```USE recipe_db;```

5) Grant the root user all privileges to the recipe_db

```GRANT ALL PRIVILEGES ON recipe_db . * TO 'root'@'localhost';```

## Populate database with sample data

The backend code in index.js uses the populateTables function in sample-populate-db.js module to create the required tables using the queries createtable.sql and populate them with the sample data which can be found [here](./db/sample-data)

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
