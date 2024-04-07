const { LogicUpload } = require ('./upload_logic.js');
const  model = require('../../models/upload.js');

class EndpointUpload {
    constructor(){
        this.logicUpload = new LogicUpload();
        this.reserveRoom = model.reserveRoom;
    }

    reserveRoomEndpoint = (uuid,publicUrl,req,res) => {
        this.reserveRoom.pathpaymentSlip = publicUrl;
        this.reserveRoom.roomType = req.body.roomType;
        this.reserveRoom.quantity = req.body.quantity;
        this.reserveRoom.checkInDate = req.body.checkInDate;
        this.reserveRoom.checkOutDate = req.body.checkOutDate;
        this.reserveRoom.fullName = req.body.fullName;
        this.reserveRoom.phoneNumber = req.body.phoneNumber;
        this.reserveRoom.email = req.body.email;
        this.reserveRoom.uuID = uuid;
        this.logicUpload.reserveRoomLogic(this.reserveRoom , res)
    }
}

module.exports = {
    EndpointUpload
}