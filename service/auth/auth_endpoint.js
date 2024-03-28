const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require('crypto');

const { LogicAuth } = require('./auth_logic.js');
const  model = require('../../models/auth.js');
const { contentSecurityPolicy } = require("helmet");


class EndpointAuth {
    constructor() {
        this.User = model.User;
        this.Customer = model.Customer;
        this.Admin = model.Admin;
        this.AdminInfo = model.AdminInfo; 
        this.logicAuth = new LogicAuth();
    }
    
    registerEndpoint = async (req, res) =>{
        console.log(req)
        this.User.Email =  req.body.email;
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        this.User.Password =  hashedPassword;
        this.Customer.custName = req.body.name;
        this.Customer.address = req.body.address;
        this.Customer.subdirect = req.body.subdirect;
        this.Customer.direct = req.body.direct;
        this.Customer.province = req.body.province;
        this.Customer.Tel = req.body.Tel;
        this.Customer.Email = req.body.email;
        this.Customer.job = req.body.job;
        this.logicAuth.registerUser(this.User,this.Customer,res);

    }
    loginEndpoint = (req , res) => {
        const { email, password } = req.body;
        this.User.Email =  email;
        this.User.Password =  password;
        this.logicAuth.loginUser(this.User,res);
    }

    registerAdminEndpoint = async (req , res) => {
        this.Admin.AdminName = req.body.AdminName;
        const password = req.body.Password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        this.Admin.Password = hashedPassword;
        this.Admin.Role = req.body.Role;
        this.AdminInfo.ID_Card = req.body.ID_Card;
        this.AdminInfo.Full_Name = req.body.Full_Name;
        this.AdminInfo.Tel = req.body.Tel;
        this.AdminInfo.Email = req.body.Email;
        this.logicAuth.registerAdmin(this.Admin ,this.AdminInfo , res );
    }

    loginadminEndpoint = (req , res) => {
        console.log(req)
        const { AdminName, Password } = req.body;
        this.Admin.AdminName = AdminName;
        this.Admin.Password = Password;
        this.logicAuth.loginAdmin(this.Admin,res)
    }
    
}

module.exports = {
    EndpointAuth
}