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

CREATE TABLE Admin (
    AdID VARCHAR(30) PRIMARY KEY,
    Adminname VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    status ENUM ('Active' , 'Inactive'),
    Role ENUM ('SuperAdmin' , 'OnlineAdmin' , 'OnsiteAdmin')
);

CREATE TABLE Admininfo (
    AdminID VARCHAR(30) NOT NULL,
    AdID VARCHAR(30) NOT NULL,
    encryptedData TEXT,
    Full_name VARCHAR(255),
    Tel VARCHAR(20),
    Email VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (AdminID),
    FOREIGN KEY (AdID) REFERENCES Admin(AdID)
);