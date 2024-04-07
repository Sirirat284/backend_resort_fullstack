const express = require('express');
const router = express.Router();

const { EndpointAdmin } = require('../service/admin/admin_endpoint.js'); 

const endpointAdmin = new EndpointAdmin;

router.get('/monitoradmin'  , endpointAdmin.monitorAdminEndpoint);

router.get('/monitorRoom' , endpointAdmin.monitorRoomEndpoint);

router.get('/updateStatusRoom', endpointAdmin.updataStatusRoomEndpoint)

router.get('/monitornewreserve', endpointAdmin.monitornewreserveEndpoint)

router.post('/deleteadmin', endpointAdmin.deleteadminEndpoint);

router.post('/updateResevesStatus', endpointAdmin.updateResevesStatusEndpoint)

module.exports = router;