const connection = require('../../db/connection.js');
const { PluginUser } = require('./user_plugin.js')

class LogicUser {
    constructor() {
        this.connection = connection;
        this.pluginUser = new PluginUser();
    }

     checkAvailableRoomlogic({ roomTypeID, checkInDate, checkOutDate }, res) {
        this.pluginUser.checkAvailableRoomPlugin({ roomTypeID, checkInDate, checkOutDate }, res)
    }    
}

module.exports = {
    LogicUser
};
