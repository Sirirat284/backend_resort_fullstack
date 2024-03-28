const { LogicUser } = require('./user_logic.js');
// สมมติว่าคุณมีการ import model ที่นี่เพื่อใช้งานในอนาคต
const model = require('../../models/auth.js');

class EndpointUser{
    constructor(){
        this.logicUser = new LogicUser();
    }

    checkAvailableRoomlEndpoint = (req, res) => {
        const { roomType, checkInDate, checkOutDate } = req.body;
        this.logicUser.checkAvailableRoomlogic({ roomType, checkInDate, checkOutDate }, res);
    }
}

module.exports = {
    EndpointUser
}
