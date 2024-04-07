const {PluginUpload} = require ('./upload_plugin.js');
const { Encrypt } = require('../units/encryption.js');
const connection = require('../../db/connection.js');

class LogicUpload {
    constructor(){
        this.pluginUpload = new PluginUpload();
        this.encrypt = new Encrypt();
        this.connection = connection;
    }

    getCustID = (userID) => {
        return new Promise((resolve, reject) => {
            let sql = "SELECT custID FROM Customers WHERE userID = ?";
        
            connection.query(sql, [userID], (error, results) => {
                if (error) {
                    reject(error);
                } else if (results.length > 0) {
                    resolve(results[0].custID);
                } else {
                    reject(new Error('No customer found with the given userID'));
                }
            });
        });
    };
    getRoomTypeID = (roomType) => {
        return new Promise((resolve, reject) => {
            let sql = "SELECT roomTypeID,price FROM RoomType WHERE roomTypeName LIKE ?";
        
            connection.query(sql, [roomType], (error, results) => {
                if (error) {
                    reject(error);
                } else if (results.length > 0) {
                    resolve(results);
                } else {
                    reject(new Error('No customer found with the given userID'));
                }
            });
        });
    };
    

    reserveRoomLogic = async (reserveRoom, res) => {  
        try {
            const de_custID = this.encrypt.decrypt(reserveRoom.uuID);
            reserveRoom.custID = await this.getCustID(de_custID);
            const result = await this.getRoomTypeID(reserveRoom.roomType);
            reserveRoom.roomTypeID = result[0].roomTypeID;
            const totalprice = result[0].price * reserveRoom.quantity;
            reserveRoom.TotalPrice = totalprice;
            console.log(reserveRoom)
            this.pluginUpload.reserveRoomPlugin(reserveRoom, res);
        } catch (error) {
            console.error("Error in reserveRoomLogic:", error);
            // ส่งคำตอบกลับไปยังไคลเอนต์ถ้ามีข้อผิดพลาด
            res.status(500).send("Error processing request");
        }
    }
}

module.exports = {
    LogicUpload
}

