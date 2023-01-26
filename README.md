# EasyBytes

Initial set up of the database project "EasyBytes" for CS348

# Team Members:
- Dhir Patel
- Guneet Bola
- Richa Dalal
- Soham Shah

# How to create and load the sample datase.

We wil be using a mySQL database.

1) Download the mySQL server and mySQL workbench.
2) Access the mySQL shell using the terminal

```mysql –u username –p```

3) Create a mySQL table to import the CSV file.

To choose a database:

```USE sample_db;```

To create the table:

```
CREATE TABLE table_name
  ( 
     column_1_name     DECIMAL(9, 0) NOT NULL PRIMARY KEY, 
     column_2_name    VARCHAR(30), 
     column3_name    VARCHAR(30), 
  );
  ```

4) Import the CSV file into the SQL table that was made.

```
LOAD DATA LOCAL INFILE 'path/filename.csv' 
	INTO TABLE table_name 
	FIELDS TERMINATED BY ',' 
	ENCLOSED BY '"'
	LINES TERMINATED BY '\n';
```
  
  5) Database has been created and loaded to the sample platform.

