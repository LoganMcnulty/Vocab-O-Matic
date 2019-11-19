CREATE DATABASE vocab_db;
USE vocab_db;

CREATE TABLE user_info
(
	id int NOT NULL AUTO_INCREMENT,
    userID INT NOT NULL,
    userName varchar(255) NOT NULL,
    passWord varchar(255) NOT NULL,
	optionalBool BOOLEAN DEFAULT false,
    timestamp TIMESTAMP,
	PRIMARY KEY (id)
);

CREATE TABLE vocab_content
(
	id INT NOT NULL AUTO_INCREMENT,
	word VARCHAR(25) NOT NULL,
    grade VARCHAR(25) NOT NULL,
    subject VARCHAR(25) NOT NULL,
    listNumber INT,
    dayCount INT,
    weekCount INT,
    monthCount INT,
	optionalBool BOOLEAN DEFAULT false,
    timestamp TIMESTAMP,
	PRIMARY KEY (id)
);


CREATE TABLE list_record
(
  id INT NOT NULL AUTO_INCREMENT,
  recordID INT,
  listNumber INT,
  subject VARCHAR(25) NOT NULL,
  email VARCHAR(45) NOT NULL,
  sms VARCHAR(20),
  grade INT default 0,
  frequency VARCHAR(25) NOT NULL,
  optionalBool BOOLEAN DEFAULT false,
  timestamp TIMESTAMP,
  PRIMARY KEY (id)
);
