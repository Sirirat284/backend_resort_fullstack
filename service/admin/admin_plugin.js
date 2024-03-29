const connection = require('../../db/connection.js');

class PluginAdmin {

    monitorAdminPlugin = (res) => {
        let sql = `SELECT 
                       Admin.AdID, 
                       Admininfo.Full_name, 
                       Admin.Role, 
                       Admin.status 
                   FROM Admin 
                   JOIN Admininfo ON Admin.AdID = Admininfo.AdID `;
    
        connection.query(sql, (err, results) => {
            if (err) {
                // Handle error
                console.log(err);
                return res.status(500).json({ message: "Error querying admin data" });
            }
    
            if (results.length > 0) {
                // Handle success
                return res.status(200).json(results);
            } else {
                // No data found
                return res.status(404).json({ message: "No admin data found" });
            }
        });
    };

    monitorRoomPlugin = (res) => {
        let sql = `
        SELECT 
            ResortRoom.roomID, 
            ResortRoom.roomNum,
            RoomType.roomTypeName, 
            ResortRoom.status
        FROM 
            ResortRoom
        JOIN 
            RoomType ON ResortRoom.roomTypeID = RoomType.roomTypeID;
        `;
    
        connection.query(sql, (err, results) => {
            if (err) {
                console.error('Error in monitorRoomPlugin:', err);
                return res.status(500).json({ message: "Error retrieving room data" });
            }
            else {res.status(200).json(results);} // ส่งข้อมูลห้องพักกลับไปเป็น JSON
        });
    }

    updataStatusRoomPlugin = (ResortRoom , res) => {
        let sql = "UPDATE ResortRoom SET status = ? WHERE roomID = ?";
        connection.query(sql, [ResortRoom.status, ResortRoom.roomID], function(err, result) {
            if (err) {
                console.error('Error updating room status:', err);
                return res.status(500).json({ message: "Error updating room status" });
            }
            if (result.affectedRows === 0) {
                // ไม่มีห้องที่มี roomID นี้
                return res.status(404).json({ message: "Room not found" });
            } else {
                // อัปเดตสำเร็จ
                return res.status(200).json({ message: "Room status updated successfully" });
            }
        });
    }

    
}

module.exports = {
    PluginAdmin
}