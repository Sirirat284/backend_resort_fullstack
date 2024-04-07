const { PluginAdmin } = require('./admin_plugin.js');

class LogicAdmin {
    constructor() {
        this.pluginAdmin = new PluginAdmin();
    }

    monitorAdminLogic = (res) => {
        this.pluginAdmin.monitorAdminPlugin(res);
    }
    monitorRoomLogic = (res) => {
        this.pluginAdmin.monitorRoomPlugin(res);
    }
    updataStatusRoomLogic = (ResortRoom , res) => {
        this.pluginAdmin.updataStatusRoomPlugin(ResortRoom , res);
    }

    monitornewreserveLogic = (res) =>{
        this.pluginAdmin.monitornewreservePlugin(res);
    }
    deleteadminLogic = (adminid , res) => {
        this.pluginAdmin.deleteadminPlugin(adminid , res);
    }

    updateResevesStatusLogic = (headID , status , res) => {
        this.pluginAdmin.updateResevesStatusPlugin(headID , status , res);
    }
}

module.exports = {
    LogicAdmin
}