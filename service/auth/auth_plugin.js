const connection = require('../../db/connection.js');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const  model  = require('../../models/auth.js');
const secretKey = process.env.SECRET_KEY;
class PluginAuth {
    constructor() {
        this.User = model.User
    }
    registerPlugin = (User,Customer, res) => {
        let checkEmailSql = "SELECT Email FROM Users WHERE Email = ?";
        connection.query(checkEmailSql, [User.Email], (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Error checking email" });
            }
            if (result.length > 0) {
                return res.status(409).json({ message: "Email already registered" });
            } else {
                let userSql = "INSERT INTO Users (userID , uuID, Email, Password, Role) VALUES (?, ?, ?, ?, 'User');"
                connection.execute(userSql, [User.userID, User.uuID, User.Email, User.Password], (err, data) => {
                    if (err) { 
                        console.log(err)
                        return res.status(401).json({ message: "Unable to complete user registration" });
                    } else {
                        // ทำการเพิ่มข้อมูลในตาราง Customers ที่นี่
                        let customerSql = "INSERT INTO Customers (custID, userID, Email, custName, address, subdirect, direct, province, Tel, job) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);"
                        // สมมติว่าคุณมีข้อมูลเหล่านี้ใน model แล้ว
                        connection.execute(customerSql, [Customer.custID, User.userID, Customer.Email, Customer.custName, Customer.address, Customer.subdirect, Customer.direct, Customer.province, Customer.Tel, Customer.job], (err, customerData) => {
                            if (err) {
                                return res.status(401).json({ message: "Unable to complete customer registration" });
                            } else {
                                res.status(201).json({ message: "Register successfully" });
                            }
                        });
                    }
                });
            }
        });
    };
    
    

    loginPugin = (model , res) => {
        const emailToQuery = model.Email;
        let sql = "SELECT userID, uuID, Email, Password, Role FROM Users WHERE Email = ?"
        connection.query(
            sql, [emailToQuery],
        async function(err ,data) {
                if(err) {  return res.status(401).json({ message: "can't connect db" }); }
                // console.log(data)
                else if(data.length > 0){
                    const passwordMatch = await bcrypt.compare(model.Password, data[0].Password);
                    if (!passwordMatch) {
                        return res
                                    .status(401)
                                    .json({ message: "Username or Password incorrect" });
                    }else {
                        const accessToken = jwt.sign({ userID: data[0].uuID, role: data[0].Role }, process.env.SECRET_KEY, {
                            expiresIn: "15m",
                        });
                    
                        const refreshToken = jwt.sign({ userID: data[0].uuID, role: data[0].Role }, process.env.REFRESH_SECRET_KEY , {
                            expiresIn: "7d",
                        });
                    
                        // Save the refresh token to your database or any other persistent storage for later use.
                    
                        console.log(accessToken);
                        console.log(refreshToken);
                    
                        return res.status(200).json({ accessToken, refreshToken });
                    }
                    
                }
                else{
                    return res
                        .status(401)
                        .json({ message: "Username or Password incorrect" });
                }
            }
        )
    }


    registerAdminPlugin = (Admin , AdminInfo , res) => {
        console.log(Admin)
        console.log(AdminInfo)
        let checkAdminnameSql = "SELECT Adminname FROM Admin WHERE Adminname = ? ";
        connection.query(checkAdminnameSql, [Admin.AdminName], (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Error checking email" });
            }
            if (result.length > 0) {
                return res.status(409).json({ message: "Email already registered" });
            } else {
                let AdminSql = "INSERT INTO Admin (AdID ,Adminname, Password, status, Role) VALUES (?, ?, ?, ?, ?);"
                connection.query(AdminSql, [Admin.AdID, Admin.AdminName, Admin.Password, 'Inactive', Admin.Role], (err, data) => {
                    if (err) { 
                        console.log('1')
                        return res.status(401).json({ message: "Unable to complete user registration 1" });
                    } else {
                        // ทำการเพิ่มข้อมูลในตาราง Customers ที่นี่
                        let AdmininfoSql = "INSERT INTO AdminInfo (AdminID, AdID, encryptedData, Full_name, Tel, Email) VALUES (?, ?, ?, ?, ?, ?);"
                        // สมมติว่าคุณมีข้อมูลเหล่านี้ใน model แล้ว
                        connection.query(AdmininfoSql, [AdminInfo.AdminID, AdminInfo.AdID, AdminInfo.encryptedData, AdminInfo.Full_Name, AdminInfo.Tel, AdminInfo.Email], (err, customerData) => {
                            if (err) {
                                console.log('2')
                                return res.status(401).json({ message: "Unable to complete customer registration 2" });
                            } else {
                                res.status(201).json({ message: "Register successfully" });
                            }
                        });
                    }
                });
            }
        });
    } 

    loginAdminPugin = (Admin , res) => {
        let sql = "SELECT AdID , Adminname, Password, status, Role FROM Admin WHERE Adminname = ?"
        connection.query(
            sql, [Admin.AdminName],
        async function(err ,data) {
                if(err) {  return res.status(401).json({ message: "can't connect db" }); }
                // console.log(data)
                else if(data.length > 0){
                    const passwordMatch = await bcrypt.compare(Admin.Password, data[0].Password);
                    if (!passwordMatch) {
                        return res
                                    .status(401)
                                    .json({ message: "Username or Password incorrect" });
                    }else {
                        console.log(data)
                        const accessToken = jwt.sign({ userID: data[0].AdID, role: data[0].Role }, process.env.SECRET_KEY, {
                            expiresIn: "15m",
                        });
                        const refreshToken = jwt.sign({ userID: data[0].AdID, role: data[0].Role }, process.env.REFRESH_SECRET_KEY, {
                            expiresIn: "7d",
                        });

                        
                        let updateSql = "UPDATE Admin SET status = ? WHERE AdID = ?";
                            connection.query(updateSql, ['Active', data[0].AdID], function(err, updateResults) {
                                if (err) {
                                    // Log the error but don't fail the entire login process
                                    console.log('Error updating user status:', err);
                                }
                                return res.status(200).json({ accessToken,refreshToken }); // ส่ง token กลับไปยังผู้ใช้
                            });              
                    }
                }
                else{
                    return res
                        .status(401)
                        .json({ message: "Username or Password incorrect" });
                }
            }
        )
    }

    logoutAdminPlugin = (Admin ,res) => {
        console.log(Admin.AdID)
        let updateSql = "UPDATE Admin SET status = ? WHERE AdID = ?";
        connection.query(updateSql, ['Inactive', Admin.AdID], function(err, updateResults) {
            if (err) {
                // Log the error but don't fail the entire login process
                console.log('Error updating user status:', err);
            }
            return res.status(200).json(); // ส่ง token กลับไปยังผู้ใช้
        });   
    }

    googleAutheLoginPlugin = (User,Customer, res) => {
        const emailToQuery = User.Email;
        let sql = "SELECT userID, uuID, Email, Role FROM Users WHERE Email = ?";

        connection.query(sql, [emailToQuery], async function(err, data) {
            if (err) {
                return res.status(401).json({ message: "Can't connect db" });
            } else if (data.length > 0) {
                // เนื่องจากไม่ต้องการตรวจสอบรหัสผ่าน จึงไปต่อสร้าง token ได้เลย
                const accessToken = jwt.sign({ userID: data[0].uuID, role: data[0].Role }, process.env.SECRET_KEY, {
                    expiresIn: "15m",
                });

                const refreshToken = jwt.sign({ userID: data[0].uuID, role: data[0].Role }, process.env.REFRESH_SECRET_KEY, {
                    expiresIn: "7d",
                });

                // Save the refresh token to your database or any other persistent storage for later use.

                console.log(accessToken);
                console.log(refreshToken);

                res.cookie('accessToken', accessToken, {
  httpOnly: true,
  path: '/',
  sameSite: 'Lax',
  maxAge: 900000 // 15 minutes
});

res.cookie('refreshToken', refreshToken, {
  httpOnly: true,
  path: '/',
  sameSite: 'Lax',
  maxAge: 604800000 // 7 days
});
		    res.redirect(`${process.env.CLIENT_URL}/`);


            } else {
                // ไม่พบอีเมล์ในฐานข้อมูล
                return res.status(401).json({ message: "Email not found" });
            }
        });
    }
    googleAutheRegisterPlugin = (User,Customer, res) => {
        let userSql = "INSERT INTO Users (userID , uuID, Email, Role) VALUES (?, ?, ?, 'User');"
        connection.execute(userSql, [User.userID, User.uuID, User.Email], (err, data) => {
            if (err) { 
                console.log(err)
                return res.status(401).json({ message: "Unable to complete user registration" });
            } else {
                // ทำการเพิ่มข้อมูลในตาราง Customers ที่นี่
                let customerSql = "INSERT INTO Customers (custID, userID, Email, custName) VALUES (?, ?, ?, ?);"
                // สมมติว่าคุณมีข้อมูลเหล่านี้ใน model แล้ว
                connection.execute(customerSql, [Customer.custID, User.userID, User.Email, Customer.custName], (err, customerData) => {
                    if (err) {
                        return res.status(401).json({ message: "Unable to complete customer registration" });
                    } else {
                        try {

                            const accessToken = jwt.sign({ userID: User.uuID, role: 'User' }, process.env.SECRET_KEY, {
                                expiresIn: "15m",
                            });
                        
                            const refreshToken = jwt.sign({ userID: User.uuID, role: 'User' }, process.env.REFRESH_SECRET_KEY , {
                                expiresIn: "7d",
                            });
				res.cookie('accessToken', accessToken, {
  httpOnly: true,
  path: '/',
  sameSite: 'Lax',
  maxAge: 900000 // 15 minutes
});

    res.cookie('refreshToken', refreshToken, {
  httpOnly: true,
  path: '/',
  sameSite: 'Lax',
  maxAge: 604800000 // 7 days
});
                            res.redirect(`${process.env.CLIENT_URL}/`);
                        } catch (jwtError) {
                            console.error(jwtError);
                            return res.status(500).json({ message: "JWT creation failed" });
                        }}
                });
            }
        });
    }
}

module.exports = {
    PluginAuth
}
