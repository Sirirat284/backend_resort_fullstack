const express = require('express');
const router = express.Router();

const { EndpointAuth } = require('../service/auth/auth_endpoint.js');  

const endpointAuth = new EndpointAuth();

router.post('/register', endpointAuth.registerEndpoint);

router.post('/login', endpointAuth.loginEndpoint);

module.exports = router;
