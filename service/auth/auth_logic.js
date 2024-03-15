const connection = require('../../db/connection.js');
const  model  = require('../../models/auth.js');
const { PluginAuth } = require('./auth_plugin.js');

class LogicAuth {
    constructor() {
        this.User = model.User
        this.pluginAuth = new PluginAuth();
    }
    getLastUserId() {
        return new Promise((resolve, reject) => {
            let sql = "SELECT userID FROM Users ORDER BY userID DESC LIMIT 1;";
            connection.query(sql, function(err, data) {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    if (data.length > 0 && data[0].userID != null){
                        const textPart = data[0].userID.match(/[a-zA-Z]+/g)?.join('') || '';
                        const numberPart = data[0].userID.match(/\d+/g)?.join('') || '';
                        const newNum = parseInt(numberPart, 10) + 1;
                        const newuser = textPart + newNum;
                        resolve(newuser); 
                    }
                    else {
                        const textPart = "User";
                        const numberPart = 1;
                        const newuser = textPart + numberPart;
                        resolve(newuser);
                    }
                }
            });
        });
    }

    async registerUser(model, res) {
        try {
            const lastUserId = await this.getLastUserId();
            model.userID = lastUserId ; 
            this.pluginAuth.registerPlugin(model, res);

        } catch (error) {
            console.log('Error in registerLogin:', error);
        }
    }

    loginUser = (model , res) => {
        this.pluginAuth.loginPugin(model,res)
    }
}

module.exports = {
    LogicAuth
}