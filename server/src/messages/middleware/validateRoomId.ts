import {Express , Request , Response , NextFunction} from "express";
import { Interface } from "readline";
import { RoomInterface, Rooms } from "rooms/room.model";



export interface MessagesRequest extends Request {
  room? : RoomInterface;
}


export async function validateRoomId (req : MessagesRequest, res : Response, next : NextFunction) {
  const {room_id} = req.params;
  const room = await Rooms.findById(room_id);
  if(!room) return res.status(404).json({message : 'Room not found'});
  req.room = room;
  next();
}