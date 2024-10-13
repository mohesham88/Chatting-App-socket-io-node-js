import { IncomingMessage,  ServerResponse } from 'http';
import { Rooms } from 'rooms/room.model';
import {Server} from 'socket.io';
import { UserModel } from 'users/user.model';

declare module "express-session" {
  interface SessionData {
    count: number;
  }
}

interface SocketRequest extends IncomingMessage
{
  session : {
    cookie : any,
    passport? : {
      user : UserModel,
    }
  }
}


export class ChatSocket {
  io: Server;
  constructor(io : any ) {
    this.io = io;
  }

  init() {
    console.log('socket inititalizing .... ');
    this.io.on('connection', async (socket) => {
        console.log('a user connected');
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
        socket.on('chat message', (msg: any) => {
            console.log('message: ' + msg);
            this.io.emit('chat message', msg);
        });
        socket.on('hello', (socket: any) => {
          console.log('recieved hello')
        });
        const session = (socket.request as SocketRequest).session;
        const user = session.passport?.user;
        if(!session || !user){
          console.log(`not autherized : socket disconnecting ... `)
          this.io.disconnectSockets();
          return;
        }
        const joined_rooms = await Rooms.find({participants : user._id})

        for(let room of joined_rooms) {
          socket.join(room.id);
          console.log(`user ${user.username} joined room ${room.name}`)
        }


        this.io.on('join-room', (roomId : string) => {
          // client emits join-room
          // socket joins the room and tells user_service to join this room if the user is not in it
        });

        this.io.on('leave-room', (roomId : string) => {
          // client emits leave-room
          // socket leaves the room and tells user_service to leave this room if the user is in it
        });

        // join all rooms that user is in 
        // socket.join()

    });

  }
}



