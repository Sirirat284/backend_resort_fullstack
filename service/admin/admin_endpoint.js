const { LogicAdmin } = require('./admin_logic.js');
const  model = require('../../models/modelAdmin.js');
const { param } = require('../../routers/user-router.js');
const jwt = require("jsonwebtoken");

class EndpointAdmin {
    constructor() {
        this.logicAdmin = new LogicAdmin();
        this.ResortRoom = model.ResortRoom;
    }

    monitorAdminEndpoint = (req ,res) =>{
        this.logicAdmin.monitorAdminLogic(res);
    }

    monitorRoomEndpoint = (req , res) => {
        this.logicAdmin.monitorRoomLogic(res);
    }

    updataStatusRoomEndpoint = (req ,res) => {
        this.ResortRoom.roomID = req.query.roomID
        this.ResortRoom.status = req.query.status
        this.logicAdmin.updataStatusRoomLogic(this.ResortRoom , res)
    }

    monitornewreserveEndpoint = (req , res) => {
        this.logicAdmin.monitornewreserveLogic(res)
    }

    deleteadminEndpoint = (req , res) => {
        const token = req.cookies['accessToken'];
        if (!token) {
            return res.status(401).send('Access Denied: No token provided.');
          }
        // Verify token with your secret key
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        
        // ตรวจสอบ role
        if (decoded.role !== 'SuperAdmin') {
            return res.status(403).send('Access Denied: You do not have correct permission.');
        }
        const adminid = req.body.adminId;
        this.logicAdmin.deleteadminLogic(adminid , res);
    }

    updateResevesStatusEndpoint = (req , res) => {
        const token = req.cookies['accessToken'];
        console.log(token)
        if (!token) {
            return res.status(401).send('Access Denied: No token provided.');
          }
        // Verify token with your secret key
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        
        // ตรวจสอบ role
        if (decoded.role !== 'OnlineAdmin') {
            return res.status(403).send('Access Denied: You do not have correct permission.');
        }
        console.log(req.body)
        const headID = req.body.headID;
        const status = req.body.status;
        this.logicAdmin.updateResevesStatusLogic(headID , status , res)
    }
}

module.exports = {
    EndpointAdmin
}