const express = require('express');
const router = express.Router();

const { EndpointUser } = require('../service/user/user_endpoint.js');  

const endpointUser = new EndpointUser();

router.post('/checkAvailableRoom', endpointUser.checkAvailableRoomlEndpoint)

module.exports = router;
