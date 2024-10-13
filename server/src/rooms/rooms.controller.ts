import { Router } from "express";
import { Rooms } from "./room.model";
import { validationMiddleware } from "middlewares/validate";
import { IsNotEmpty, IsOptional, IsString, IsUrl, IsUUID } from "class-validator";
import { NotFoundError } from "rest-api-errors";
import mongoose, { isValidObjectId, ObjectId } from "mongoose";
import { IsValidObjectId } from "utils/custom decorators/IsValidObjectId";

const app = Router();


class RoomDTO {
  @IsString()
  @IsNotEmpty()
  name : string;


  @IsString()
  @IsNotEmpty()
  description : string;

  @IsUrl()
  @IsNotEmpty()
  picture : string;
}




app.route('/')
  .get(async (req , res) => {
    // get all rooms with limit of 20 rooms
    const rooms = await Rooms.find();

    return res.status(200).json(rooms);

  }).post( validationMiddleware(RoomDTO) ,async (req , res) => {
    // create a new Roow
    const room  = await Rooms.create(req.body) ;
    return res.status(201).json(room);
  })



class RoomUpdateDTO {
  @IsString()
  @IsOptional()
  name : string;

  @IsString()
  @IsOptional()
  description : string;

  @IsUrl()
  @IsOptional()
  picture : string;
}

app.patch('/:id' , validationMiddleware(RoomUpdateDTO) , async (req , res) => {
  // update a room
  const room = await Rooms.findByIdAndUpdate(req.params.id , req.body , {
    new : true,
  });
  return res.status(200).json(room);
})



class JoinRoomDTO {
  @IsValidObjectId() // custom decorator
  @IsNotEmpty()
  room_id : mongoose.Types.ObjectId;


}


app.post('/join' , validationMiddleware(JoinRoomDTO) , async (req , res) => {
  const room_id = req.body.room_id;

  await Rooms.updateOne({_id : room_id} , {
    $addToSet : {
      participants : req.user?._id,
    }
  })

  /* const room = await Rooms.findById(room_id);
  if(!room){
    throw new NotFoundError('Room not found');
  }
  const user_id = req.user?._id;
  console.log(`USERID : ${req.user?._id}`);
  if(user_id){
    room.participants.push(user_id as ObjectId);
    const newRoom = await room.save();
    console.log(newRoom);
  } */
  return res.status(200).json({
    message : 'success'
  });
})


export default app;

