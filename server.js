const express = require('express');
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const db = require('./db/connection.js');
const authRouter = require('./routers/auth-router.js');
const bodyParser = require('body-parser');
const userRouter = require('./routers/user-router.js');
const adminRouter = require('./routers/admin-router.js');
const uploadRouter = require('./routers/upload-router.js')
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});
passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: `${process.env.SERVER_URL}/auth/google/callback`
},
function(accessToken, refreshToken, profile, done) {
  // In this example, the user's Google profile is just passed back.
  // In a real application, you would likely compare the Google ID against your user database here.
  // If the user exists, log them in. If they do not, create them in the database.
  return done(null, profile);
}
));
// passport.use(passportSetup);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
  secret: 'cyberwolve', // ใช้คีย์ลับที่เข้มงวดและซับซ้อนกว่านี้
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(helmet());
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};
app.use(cors(corsOptions));
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);
app.use(authRouter);
app.use(userRouter);
app.use(adminRouter);
app.use(uploadRouter);



app.get('/', (req, res) => {
  res.send('Hello, World!');
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
