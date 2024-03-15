const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { LogicAuth } = require('./auth_logic.js');
const  model = require('../../models/auth.js');

class EndpointAuth {
    constructor() {
        this.User = model.User
        this.logicAuth = new LogicAuth();
    }
    
    registerEndpoint = async (req, res) =>{
        const { email, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        this.User.Email =  email;
        this.User.Password =  hashedPassword;
        this.logicAuth.registerUser(this.User,res);

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