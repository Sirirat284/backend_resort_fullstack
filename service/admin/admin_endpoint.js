const { LogicAdmin } = require('./admin_logic.js');
const  model = require('../../models/modelAdmin.js');

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

}

module.exports = {
    EndpointAdmin
}