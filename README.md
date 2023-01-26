# EasyBytes

Initial set up of the database project "EasyBytes" for CS348

# Team Members:
- Dhir Patel
- Guneet Bola
- Richa Dala
- Soham Shah

# How to create and load the sample datase.

We wil be using a mySQL database.

1) Download the mySQL server and mySQL workbench.
2) Access the mySQL shell using the terminal

mysql –u username –p

3) Create a mySQL table to import the CSV file.

To choose a database:

```USE sample_db;```

To create the table:

CREATE TABLE student
  ( 
     snum     DECIMAL(9, 0) NOT NULL PRIMARY KEY, 
     sname    VARCHAR(30), 
     major    VARCHAR(25), 
     standing VARCHAR(2), 
     age      DECIMAL(3, 0) 
  ); 

4) Import the CSV file into the SQL table that was made.

  LOAD DATA LOCAL INFILE '/Users/owner/Desktop/cs348/project/codesample/Database/testdb/student.csv' 
	INTO TABLE student 
	FIELDS TERMINATED BY ',' 
	ENCLOSED BY '"'
	LINES TERMINATED BY '\n';
  
  5) Database has been created and loaded to the sample platform.

