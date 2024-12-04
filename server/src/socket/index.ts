import { IncomingMessage, ServerResponse } from "http";
import { Rooms } from "rooms/room.model";
import { Server } from "socket.io";
import { UserModel } from "users/user.model";
import  MessagesModel , {MessageSchema} from "messages/message.model";
import { sendNotification } from "notifications/notifications.service";

declare module "express-session" {
  interface SessionData {
    count: number;
  }
}

interface SocketRequest extends IncomingMessage {
  session: {
    cookie: any;
    passport?: {
      user: UserModel;
    };
  };
}

export class ChatSocket {
  private static _instance: ChatSocket;
  io: Server;

  constructor(io: any) {
    if (ChatSocket._instance) {
      return ChatSocket._instance;
    }
    this.io = io;
    ChatSocket._instance = this;
  }

  init() {
    console.log("socket inititalizing .... ");
    this.io.on("connection", async (socket) => {
      console.log("a user connected");
      socket.on("disconnect", () => {
        console.log("user disconnected");
      });

      socket.emit("handshake", "hello from server");

      socket.on("chat message", (msg: any) => {
        console.log("message: " + msg);
        this.io.emit("chat message", msg);
      });
      socket.on("hello", (socket: any) => {
        console.log("recieved hello");
      });
      const session = (socket.request as SocketRequest).session;
      const user = session.passport?.user;
      if (!session || !user) {
        console.log(`not autherized : socket disconnecting ... `);
        this.io.disconnectSockets();
        return;
      }
      const joined_rooms = await Rooms.find({ participants: user._id });

      for (let room of joined_rooms) {
        socket.join(room.id);
        console.log(`user ${user.username} joined room ${room.name}`);
      }

      /* socket.on("sendMessage", async (Message) => {
        const { roomId, message } = Message;

        console.log(`message : ${message} in room ${roomId}`);
        socket.to(roomId).emit("newMessage", {
          message,
          roomId,
        });


        
        
      }); */

      socket.on("join-room", (roomId: string) => {
        // client emits join-room
        // socket joins the room and tells user_service to join this room if the user is not in it
      });

      socket.on("leave-room", (roomId: string) => {
        // client emits leave-room
        // socket leaves the room and tells user_service to leave this room if the user is in it
      });

      // join all rooms that user is in
      // socket.join()
    });
  }

  static sendMessageToRoom(roomId: string, message: any) {
    if(this._instance === undefined){
      console.log("socket instance is not initialized");
      return;
    }
    this._instance.io.to(roomId).emit("newMessage", {
      message,
      roomId,
    });
  }
}
