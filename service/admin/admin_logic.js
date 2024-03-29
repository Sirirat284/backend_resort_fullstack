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
        this.pluginAdmin.updataStatusRoomPlugin(ResortRoom , res)
    }
}

module.exports = {
    LogicAdmin
}