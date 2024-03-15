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
    registerPlugin = (model, res) => {
        let checkEmailSql = "SELECT Email FROM Users WHERE Email = ?";
        connection.query(checkEmailSql, [model.Email], (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Error checking email" });
            }
            if (result.length > 0) {
                return res.status(409).json({ message: "Email already registered" });
            }
            let sql = "INSERT INTO Users (userID, Email, Password, Role) VALUES (?, ?, ?, 'User');"
            connection.query(sql, [model.userID, model.Email, model.Password], (err, data) => {
                if (err) { 
                    return res.status(401).json({ message: "Unable to complete registration" });
                } else {
                    res.status(201).json({ message: "Register successfully" }); 
                }
            });
        });
    }
    

    loginPugin = (model , res) => {
        const emailToQuery = model.Email;
        let sql = "SELECT userID , Email, Password, Role FROM Users WHERE Email = ?"
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
                        console.log(data)
                        const token = jwt.sign({    userID: data[0].userID,
                                                    role: data[0].Role}, secretKey, {
                        expiresIn: "1h",
                        });
                        console.log(token)
                        return res.status(200).json({ token });              
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
}

module.exports = {
    PluginAuth
}