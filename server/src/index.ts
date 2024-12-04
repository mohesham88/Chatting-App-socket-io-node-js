// src/index.ts
import express from "express";
import mongoose, { Mongoose, set } from "mongoose";

import {
  connectToMongo,
  mongo,
  MONGO_DATABASE,
  reconnectTimeout,
  SERVER_PORT,
  setupConnectHandlers,
} from "./config/db";
import "express-async-errors";
import authController from "./auth/auth.controller";
import UsersController from "./users/user.controller";
import session from "express-session";
import passport from "passport";
import "./auth/stratgies/google.strategy";
import { isLoggedInMiddleware } from "./middlewares/isLoggedIn";
import { errorHandlerMiddleware } from "./middlewares/errorHandler";
import bodyParser from "body-parser";
import "cookie-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import MongoStore from "connect-mongo";
import { createServer } from "http";
import RoomsController from "./rooms/rooms.controller";
import MessagesController from "./messages/message.controller";
import NotficationController from "./notifications/notifications.controller";
import { Server } from "socket.io";
import { ChatSocket } from "socket";

import { admin, initFirebase } from "./firebase/index";

export const app = express(); // exporting it for testing purposes
const httpServer = createServer(app);

app.use(
  cors({
    origin: process.env.REACT_CLIENT,
    credentials: true,
    optionsSuccessStatus: 200,
    methods: "GET,POST,PUT,DELETE,OPTIONS",
  })
);
app.use(express.json());
app.use(cookieParser());

const sessionMiddleware = session({
  resave: false,
  saveUninitialized: false,
  secret: String(process.env.SESSION_SECRET),
  cookie: {
    secure: process.env.NODE_ENV === "production" ? true : false,
    httpOnly: false,
    maxAge: 24 * 7 * 60 * 60 * 1000, // 7 days
  },
  store: MongoStore.create({
    mongoUrl: mongo.MONGO_CONNECTION,
    ttl: 60 * 60 * 24 * 7, // 7 days,
    autoRemove: "native",
  }),
});

app.use(sessionMiddleware);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

const router = express.Router();
router.use("/auth", authController);

router.use(isLoggedInMiddleware);

const io = new Server(httpServer, {
  cors: {
    origin: process.env.REACT_CLIENT,
    methods: ["GET", "POST"],
  },
  transports: ["websocket"],
});

io.engine.use(sessionMiddleware);

const socket = new ChatSocket(io); // sharing the session with socket.io so it could be used
socket.init();

router.use("/users", UsersController);

router.use("/rooms", RoomsController);

router.use("/messages", MessagesController);

router.use("/notifications", NotficationController);

// make all endpoints start with the prefix api/v1
app.use("/api/v1", router);

/* app.get('/', async (req, res) => {
  
  res.json(req.user)
}); */

app.use(errorHandlerMiddleware);

httpServer.listen(SERVER_PORT, async () => {
  console.log(`Server is running on http://localhost:${SERVER_PORT} `);

  try {
    setupConnectHandlers();
    await connectToMongo();

    initFirebase();
    // admin.initializeApp({
    //   credential: admin.credential.cert(ServiceAccount as admin.ServiceAccount),
    // });
  } catch (err) {
    console.log(err);
  }
});
