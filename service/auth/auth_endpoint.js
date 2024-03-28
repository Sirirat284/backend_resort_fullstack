const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { LogicAuth } = require('./auth_logic.js');
const  model = require('../../models/auth.js');

class EndpointAuth {
    constructor() {
        this.User = model.User;
        this.Customer = model.Customer;
        this.logicAuth = new LogicAuth();
    }
    
    registerEndpoint = async(req, res) =>{
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
    
}

module.exports = {
    EndpointAuth
}