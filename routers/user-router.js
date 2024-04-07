const express = require('express');
const router = express.Router(); // สมมติว่าคุณมีฟังก์ชันนี้ในไฟล์อื่น

const { EndpointUser } = require('../service/user/user_endpoint.js');  

const endpointUser = new EndpointUser();

router.get('/checkAvailableRoom', endpointUser.checkAvailableRoomlEndpoint)








module.exports = router;
