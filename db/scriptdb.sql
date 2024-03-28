CREATE TABLE Users (
    userID VARCHAR(30) PRIMARY KEY,
    Email VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    Role ENUM ('User')
);

CREATE TABLE Customers (
    custID VARCHAR(30) PRIMARY KEY,
    userID VARCHAR(30),
    custName VARCHAR(255),
    address VARCHAR(255), 
    subdirect VARCHAR(255),
    direct VARCHAR(255),
    province VARCHAR(255),
    Tel VARCHAR(20),
    Email VARCHAR(255),
    job VARCHAR(255),
    FOREIGN KEY (userID) REFERENCES Users(userID)
);

CREATE TABLE Payment (
    paymentID VARCHAR(30) PRIMARY KEY,
    paymentSlip VARCHAR(255),
    paymentStatus ENUM ('จ่าย', 'ไม่จ่าย')
);

CREATE TABLE RoomType (
    roomTypeID VARCHAR(30) PRIMARY KEY,
    price DECIMAL(10, 2),
    numberOfRooms INT,    
)

CREATE TABLE ResortRoom (
    roomID VARCHAR(30) PRIMARY KEY,
    roomTypeID VARCHAR(30),
    roomNum VARCHAR(30),
    status ENUM('ว่าง', 'ไม่ว่าง', 'ปรับปรุง') NOT NULL,
    FOREIGN KEY (roomTypeID) REFERENCES RoomType(roomTypeID)
)

CREATE TABLE DetailRoomReservation (
    detailID VARCHAR(30) PRIMARY KEY,
    roomTypeID VARCHAR(30),
    TotalPrice DECIMAL(10, 2),
    timestamp TIMESTAMP,
    FOREIGN KEY (roomTypeID) REFERENCES RoomType(roomTypeID)
)

CREATE TABLE headerRoomReservation (
    headID VARCHAR(30) PRIMARY KEY,
    paymentID VARCHAR(30),
    custID VARCHAR(30),
    detailID VARCHAR(30),
    fullName VARCHAR(255),
    tel VARCHAR(20), 
    Email VARCHAR(255),
    checkInDate DATE,
    checkOutDate DATE,
    timestamp TIMESTAMP,
    status ENUM ('จองสำเร็จ', 'จองไม่สำเร็จ')

    FOREIGN KEY (paymentID) REFERENCES Payment(paymentID),
    FOREIGN KEY (custID) REFERENCES Customers(custID),
    FOREIGN KEY (detailID) REFERENCES DetailRoomReservation(detailID)

);


