CREATE TABLE Users (
    userID VARCHAR(30) PRIMARY KEY,
    Email VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    Role ENUM ('User' , 'Admin')
);
