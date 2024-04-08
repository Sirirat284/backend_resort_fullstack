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
	    console.log("GREEN 111");
        this.User.Email =  req.body.email;
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        this.User.Password =  hashedPassword;
        this.Customer.custName = req.body.fullName;
        this.Customer.address = req.body.address;
        this.Customer.subdirect = req.body.subdistrict;
        this.Customer.direct = req.body.district;
        this.Customer.province = req.body.province;
        this.Customer.Tel = req.body.phoneNumber;
        this.Customer.Email = req.body.email;
        this.Customer.job = req.body.occupation;
        this.logicAuth.registerUser(this.User,this.Customer,res);

    }
    loginEndpoint = (req , res) => {
        const { email, password, ip } = req.body;
        this.User.Email =  email;
        this.User.Password =  password;
        this.User.ip = ip
        console.log(this.User)
        this.logicAuth.loginUser(this.User,res);
    }

    registerAdminEndpoint = async (req , res) => {
/*        const token = req.cookies['accessToken'];
        if (!token) {
            return res.status(401).send('Access Denied: No token provided.');
          }
        // Verify token with your secret key
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        
        // ตรวจสอบ role
        if (decoded.role !== 'SuperAdmin') {
            return res.status(403).send('Access Denied: You do not have correct permission.');
        }
*/
        console.log(req.body)
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
        const { AdminName, Password } = req.body;
        this.Admin.AdminName = AdminName;
        this.Admin.Password = Password;
        console.log(req.body);
        this.logicAuth.loginAdmin(this.Admin,res)
    }

    logoutadminEnpoint = (req , res) => {
        this.Admin.AdID = req.body.AdID;
        this.logicAuth.logoutAdmin(this.Admin , res)
    }

    googleAutheEndpoint = (req , res) => {
        this.User.Email = req.user.emails[0].value;
        this.Customer.custName = req.user.name.givenName + req.user.name.familyName

        console.log()
        this.logicAuth.googleAutheLogic(this.User,this.Customer,res)
    }
    
}

module.exports = {
    EndpointAuth
}
