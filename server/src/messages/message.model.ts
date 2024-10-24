import mongoose , {Model, Schema, Document } from "mongoose";
import { send } from "process";



type Sender = {
  id : String,
  username : String,
  avatar : String,
}

const senderSchema = new Schema<Sender>({
  id : {
    type : Schema.ObjectId,
    required : true,
  },
  username : {
    type : String,
    required : true,
  },
  avatar : {
    type : String,
    required : true,
  }
})

export interface Message {
  text : String,
  sender : Sender,
  timestamp : Date,
  room : Schema.Types.ObjectId,
  attachment? : String,
}



export const MessageSchema = new Schema<Message>({
  text : {
    type : String,
    required : true,
  },
  sender : {
    type : senderSchema,
    required : true,
  },
  attachment : {
    type : String,
    required : false,
  },
  room : {
    type : Schema.Types.ObjectId,
    required : true,
    ref : 'Rooms',
  }
}, {
  timestamps : true,
})


const MessageModel : Model<Message> = mongoose.model<Message>('Message', MessageSchema);

export default MessageModel;