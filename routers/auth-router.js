const express = require('express');
const router = express.Router();
const passport = require('passport');

const { EndpointAuth } = require('../service/auth/auth_endpoint.js');  

const endpointAuth = new EndpointAuth();

router.post('/register', endpointAuth.registerEndpoint);

router.post('/login', endpointAuth.loginEndpoint);

// router.post('/logout')

router.post('/registerAdmin' , endpointAuth.registerAdminEndpoint);

router.post('/loginAdmin' , endpointAuth.loginadminEndpoint)

router.post('/logoutAdmin', endpointAuth.logoutadminEnpoint)

// router.get("/login/success",(req,res)=>{
//     if(req.user){
//         res.status(200).json({
//             error:false,
//             message:"Successfully Loged In",
//             user:req.user,
//         })

//     }else{
//         res.status(403).json({error:true, message:"Not Authorized"});
//     }
// });

// router.get('/login/failed',(req,res)=>{
//     res.status(401).json({
//         error:true,
//         message:"Log in failure"
//     });
// });

// router.get('/google/callback',
//             passport.authenticate("google",{
//                 successRedirect:process.env.CLIENT_URL,
//                 failureRedirect:"/login/failed",
//             })
// );

// router.get("/google",passport.authenticate("google",["profile","email"]));

// router.get("logout",(req,res)=>{
//     req.logout();
//     req.redirect(process.env.CLIENT_URL);
// })
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        endpointAuth.googleAutheEndpoint(req,res);
    // res.redirect('http://localhost:8080/');
  });


module.exports = router;
