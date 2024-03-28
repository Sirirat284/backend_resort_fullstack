const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const db = require('./db/connection.js');
const authRouter = require('./routers/auth-router.js');
const userRouter = require('./routers/user-router.js');


app.use(express.json());


app.use(helmet());
app.use(cors());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);
app.use(authRouter);
app.use(userRouter);



app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
