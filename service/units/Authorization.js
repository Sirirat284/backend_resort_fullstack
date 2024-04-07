const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  // ได้รับ token จาก header Authorization
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401); // ถ้าไม่มี token ส่ง 401 Unauthorized

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // ส่ง 403 Forbidden ถ้า token ไม่ถูกต้อง
    req.user = user;
    next(); // ไปยัง middleware หรือ route handler ถัดไป
  });
};

module.exports = authenticateToken;
