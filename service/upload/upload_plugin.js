const connection = require('../../db/connection.js');


class PluginUpload {
    constructor(){
        this.connection = connection;
    }

    reserveRoomPlugin = async (reserveRoom, res) => {
        try {
            // 1. บันทึกข้อมูลการชำระเงิน
            const insertPaymentSql = `INSERT INTO Payment (pathpaymentSlip) VALUES (?)`;
            const [paymentResult] = await connection.promise().query(insertPaymentSql, [reserveRoom.pathpaymentSlip]);
            const paymentID = paymentResult.insertId;
    
            // 2. บันทึกข้อมูลการจองห้องพร้อมราคาและประเภทห้อง
            const { roomTypeID, TotalPrice,  quantity} = reserveRoom;
            const insertDetailSql = `INSERT INTO DetailRoomReservation (roomTypeID, TotalPrice, quantity, timestamp) VALUES (?, ?, ?, NOW())`;
            const [detailResult] = await connection.promise().query(insertDetailSql, [roomTypeID, TotalPrice, quantity ]);
            const detailID = detailResult.insertId;
    
            // 3. บันทึกข้อมูลส่วนหัวของการจองพร้อมรายละเอียดที่ได้จากขั้นตอนก่อนหน้า
            const { custID, passcode, fullName, phoneNumber, email, checkInDate , checkOutDate } = reserveRoom;
            const insertHeaderSql = `
                INSERT INTO headerRoomReservation 
                (paymentID, custID, detailID,  fullName, tel, Email, checkInDate, checkOutDate, timestampReserve, status) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), 'รอตรวจสอบ')`;
            await connection.promise().query(insertHeaderSql, [paymentID, custID, detailID,  fullName, phoneNumber, email, checkInDate, checkOutDate]);
    
            // ส่ง response กลับว่าการจองสำเร็จ
            res.status(200).json({ message: "Reservation successful"});
    
        } catch (error) {
            console.error('Error in reserveRoomPlugin:', error);
            res.status(500).send('Internal Server Error');
        }
    };
    
}

module.exports = {
    PluginUpload
}