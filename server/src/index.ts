// src/index.ts
import express from 'express';
import mongoose, { Mongoose, set} from 'mongoose';

import {connectToMongo, mongo, reconnectTimeout, SERVER_PORT, setupConnectHandlers } from './config/db'
import 'express-async-errors'
import authController from './auth/auth.controller'
import UsersController from './users/user.controller'
import session from 'express-session';
import passport from 'passport';
import  './auth/stratgies/google.strategy';
import { isLoggedInMiddleware } from 'middlewares/isLoggedIn';
import { errorHandlerMiddleware } from 'middlewares/errorHandler';
import bodyParser from 'body-parser';
import 'cookie-parser'
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
app.use(cors({
  origin : 'http://localhost:3005',
  credentials : true,
  optionsSuccessStatus : 200,
  methods : "GET,POST,PUT,DELETE,OPTIONS"
}))
app.use(express.json())
app.use(cookieParser())
app.use(
  session({
    resave : false,
    saveUninitialized : false,
    secret : String(process.env.SESSION_SECRET),
    cookie : {
      secure : (process.env.NODE_ENV === 'production' ? true : false),
      httpOnly : true,
      maxAge : 24 * 7 * 60 * 60 * 1000, // 7 days
    }
  })
)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(passport.initialize())
app.use(passport.session())

const router = express.Router();
router.use('/auth' , authController);


router.use(isLoggedInMiddleware);

router.use('/users' , UsersController );


// make all endpoints start with the prefix api/v1
app.use('/api/v1', router)

app.get('/', async (req, res) => {
  
  res.json(req.user)
});


app.use(errorHandlerMiddleware);

app.listen(SERVER_PORT, async () => {
  console.log(`Server is running on http://localhost:${SERVER_PORT} `);
  
  try {
    setupConnectHandlers();
    await connectToMongo();
  }catch(err){
    console.log(err);
  }
});