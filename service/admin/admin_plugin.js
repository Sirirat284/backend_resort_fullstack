const connection = require('../../db/connection.js');
const util = require('util');

class PluginAdmin {

    monitorAdminPlugin = (res) => {
        let sql = `SELECT 
                       Admin.AdID, 
                       AdminInfo.Full_name, 
                       Admin.Role, 
                       Admin.status 
                   FROM Admin 
                   JOIN AdminInfo ON Admin.AdID = AdminInfo.AdID `;
    
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

    monitornewreservePlugin = (res) =>{
        let sql = `
        SELECT 
            Payment.pathpaymentSlip,
            headerRoomReservation.headID,
            headerRoomReservation.fullName,
            headerRoomReservation.tel,
            headerRoomReservation.Email,
            DATE_FORMAT(headerRoomReservation.checkInDate, '%d/%m/%Y') AS checkInDate,
            DATE_FORMAT(headerRoomReservation.checkOutDate, '%d/%m/%Y') AS checkOutDate,
            RoomType.roomTypeID,
            RoomType.roomTypeName,
            DetailRoomReservation.quantity,
            DetailRoomReservation.TotalPrice
        FROM 
            headerRoomReservation
        JOIN 
            Payment ON headerRoomReservation.paymentID = Payment.paymentID
        JOIN 
            DetailRoomReservation ON headerRoomReservation.detailID = DetailRoomReservation.detailID
        JOIN 
            RoomType ON DetailRoomReservation.roomTypeID = RoomType.roomTypeID
        WHERE 
            headerRoomReservation.status = 'รอตรวจสอบ';
        `;
    
        connection.query(sql, function(err, results) {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.status(200).json(results);
        });
    }

    
    deleteadminPlugin = async (adminid, res) => {
        const sql = 'DELETE FROM Admin WHERE AdID = ?';
        
        connection.query(sql, [adminid], function(err, results) {
            if (err) {
                console.error('Delete admin error:', err);
                return res.status(500).json({ success: false, message: 'Error deleting admin.' });
            }
            if (results.affectedRows === 0) {
                // ไม่มี Admin ที่ต้องการลบ
                return res.status(404).json({ success: false, message: 'Admin not found.' });
            }
            let sqldelete = 'UPDATE AdminInfo SET AdID = "" WHERE AdID = ?;'

            connection.query(sqldelete, [adminid], function(err, results){
                if (err) {
                    console.error('Delete admin error:', err);
                    return res.status(500).json({ success: false, message: 'Error deleting admin.' });
                }
            })
            res.status(200).json({ success: true, message: 'Admin deleted successfully.' });
        });
    };

    updateResevesStatusPlugin = (headID , status , res) => {
        const query = 'UPDATE headerRoomReservation SET status = ? WHERE headID = ?';
        connection.query(query, [status, headID], (err, result) => {
            if (err) {
              console.error('Error updating reservation status', err);
              return res.status(500).send({ error: 'Error updating reservation status' });
            }
            if (result.affectedRows === 0) {
              // ไม่มีการจองที่มี headID นี้
              return res.status(404).send({ message: 'Reservation not found' });
            } else {
              // อัปเดตสำเร็จ
              return res.status(200).send({
                message: `Reservation ${headID} status updated to ${status}`,
                headID: headID,
                status: status
              });
            }
          });
    }
}

module.exports = {
    PluginAdmin
}