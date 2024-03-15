CREATE TABLE Users (
    userID VARCHAR(30) PRIMARY KEY,
    Email VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    Role ENUM ('User' , 'Admin')
);
CREATE TABLE Customers (
    custID VARCHAR(30) PRIMARY KEY,
    userID VARCHAR(30),
    custName VARCHAR(255),
    address VARCHAR(30),
    subdirect VARCHAR(255),
    direct VARCHAR(255),
    province VARCHAR(255),
    Tel VARCHAR(20),
    Email VARCHAR(255),
    job VARCHAR(255)
);
