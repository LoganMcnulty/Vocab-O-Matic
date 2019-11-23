CREATE DATABASE vocabomatic;
USE vocabomatic;

CREATE TABLE user_info
(
	id int NOT NULL AUTO_INCREMENT,
    userID INT NOT NULL,
    fullName varchar(255),
    userName varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
	userBOOL BOOLEAN DEFAULT false,
    timestamp TIMESTAMP,
	PRIMARY KEY (id)
);

CREATE TABLE vocab_content
(
	id INT NOT NULL AUTO_INCREMENT,
	word VARCHAR(25) NOT NULL,
    grade VARCHAR(25) NOT NULL,
    vocabSubject VARCHAR(25) NOT NULL,
    listNumber INT,
    singleCount INT,
	vocabBOOL BOOLEAN DEFAULT false,
    timestamp TIMESTAMP,
	PRIMARY KEY (id)
);


CREATE TABLE delivery_record
(
  id INT NOT NULL AUTO_INCREMENT,
  recordID INT,
  userID INT NOT NULL,
  listNumber INT,
  frequencyTracker INT,
  vocabSubject VARCHAR(25) NOT NULL,
  email VARCHAR(45) NOT NULL,
  smsNumber VARCHAR(20),
  grade INT default 0,
  frequency VARCHAR(25) NOT NULL,
  listBOOL BOOLEAN DEFAULT false,
  timestamp TIMESTAMP,
  PRIMARY KEY (id)
);
