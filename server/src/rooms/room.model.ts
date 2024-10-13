

import mongoose , {Model, Schema, Document } from "mongoose";
import validator from "validator";



export interface RoomInterface extends Document {
  name: string;
  description: string;
  picture : String;
  participants : [Schema.Types.ObjectId],
}


// Thread message is meant to work as a room or a
const RoomSchema = new Schema<RoomInterface>({
  name : {
    type : String,
    required : [true, 'name cant be empty'],

  },
  description : {
    type : String,
    required: true,
  },
  picture : {
    type : String,
    required : true,
    validate : { 
      validator: function(value : String) {
        let urlRegex : RegExp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
        return urlRegex.test(value as string);
      },
      message: props => `${props.value} is not a Valid URL` 
    }
  },
  participants: {
    type : [Schema.Types.ObjectId],
    ref : 'User',
    required : false,
    default : [],
  }

  /*   chat : {
    type : Schema.Types.ObjectId,
    ref : 'Chat'
  }, */


},{
  timestamps : true,
})
/* 
RoomSchema.path('picture').validate((val) => {
  let urlRegex : RegExp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
  return urlRegex.test(val);
}, 'Invalid URL.'); */

export const Rooms : Model<RoomInterface> = mongoose.model<RoomInterface>('Rooms', RoomSchema);