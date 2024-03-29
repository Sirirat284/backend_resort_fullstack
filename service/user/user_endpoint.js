const { LogicUser } = require('./user_logic.js');
// สมมติว่าคุณมีการ import model ที่นี่เพื่อใช้งานในอนาคต
const model = require('../../models/auth.js');

class EndpointUser{
    constructor(){
        this.logicUser = new LogicUser();
    }

    checkAvailableRoomlEndpoint = (req, res) => {
        console.log (req.body)
        const { roomTypeID, checkInDate, checkOutDate } = req.body;
        this.logicUser.checkAvailableRoomlogic({ roomTypeID, checkInDate, checkOutDate }, res);
    }
}

module.exports = {
    EndpointUser
}
