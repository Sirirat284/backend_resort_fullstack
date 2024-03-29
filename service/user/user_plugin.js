const connection = require('../../db/connection.js');


class PluginUser {

    constructor () {
        this.connection = connection;
    }

    checkAvailableRoomPlugin = ({ roomTypeID, checkInDate, checkOutDate }, res) => {
        try {
            const query = `
                SELECT COUNT(DISTINCT rr.roomID) AS availableRooms
                FROM ResortRoom rr
                JOIN RoomType rt ON rr.roomTypeID = rt.roomTypeID
                WHERE rt.roomTypeID = ?
                AND NOT EXISTS (
                    SELECT 1
                    FROM DetailRoomReservation drr
                    JOIN headerRoomReservation hrr ON drr.detailID = hrr.detailID
                    WHERE drr.roomTypeID = rr.roomTypeID
                    AND (
                        (hrr.checkInDate BETWEEN ? AND ?)
                        OR (hrr.checkOutDate BETWEEN ? AND ?)
                        OR (? BETWEEN hrr.checkInDate AND hrr.checkOutDate)
                        OR (? BETWEEN hrr.checkInDate AND hrr.checkOutDate)
                    )
                );
            `;
    
            // ให้ค่าที่เหมาะสมกับ placeholders
            this.connection.query(query, [roomTypeID, checkInDate, checkOutDate, checkInDate, checkOutDate, checkInDate, checkOutDate], (err, results) => {
                if (err) {
                    console.error('Error executing query:', err);
                    res.status(500).send('Internal Server Error');
                    return;
                }
                // ส่งผลลัพธ์กลับไปยังคลายเอนต์
                res.status(200).json({ availableRooms: results[0].availableRooms });
            });
    
        } catch (error) {
            console.error('Error in checkAvailableRoomlogic:', error);
            res.status(500).send('Internal Server Error');
        }
    }

}

module.exports = {
    PluginUser
}