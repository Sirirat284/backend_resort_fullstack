const express = require('express');
const router = express.Router();

const { EndpointAuth } = require('../service/auth/auth_endpoint.js');  

const endpointAuth = new EndpointAuth();

router.post('/register', endpointAuth.registerEndpoint);

router.post('/login', endpointAuth.loginEndpoint);

router.post('/logout')

router.post('/registerAdmin' , endpointAuth.registerAdminEndpoint);

router.post('/loginAdmin' , endpointAuth.loginadminEndpoint)

router.post('/logoutAdmin', endpointAuth.logoutadminEnpoint)


module.exports = router;
