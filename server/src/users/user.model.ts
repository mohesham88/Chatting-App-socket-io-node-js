import mongoose , {Model, Schema, Document } from "mongoose";
import bcrypt from "bcrypt";



interface Email{
  address : String,
  verified : Boolean
}


const EmailSchema = new Schema<Email>({
  address : {
    type : String, 
    required : true,
    match : [/\S+@\S+\.\S+/ , 'invalid email address'], 
    index : true, // indexed as it will be queried alot
  }, 
  verified: {
    type : Boolean,
    default : false,
  }
})



export interface User {
  username: string;
  // password: string;
  email: Email;

}

interface Profile {
  fullName : String ,
  avatar : String , // url
  bio : String,
}

const ProfileSchema : Schema<Profile> = new Schema<Profile>({
  fullName : {
    type : String,
    required : true,
  },
  avatar : {
    type: String,
    required : false,
    default : "https://icons.iconarchive.com/icons/papirus-team/papirus-status/256/avatar-default-icon.png"
  },
  bio : {
    type: String, 
    required: false,
    /* default : function(){
      console.log(this.fullName);
      return `it's ${this.fullName}}`
    } */
  },

})

ProfileSchema.pre<Profile>('save', function(this : Profile ,next : (err?: Error) => void) {
  
  if (!this.bio) {
    this.bio = `it's ${this.fullName}`;
  }
  next();
});



interface google {
  id: String,
  token: String,
  name: String

}

const googleSchema : Schema<google> = new Schema<google>({
  id : {
    type : String,
    required : false,
  },
  token : {
    type : String,
    required : false,
  },
  name : {
    type : String,
    required : false,
  }
});




export interface UserModel extends User , Document {
  profile : Profile,
  active : Boolean,
  google : google,
}



export const userSchema  = new Schema<UserModel>({

  username: {
      type: String,
      required: [true, 'username cant be empty'],
      unique: true,
      lowercase: true,
      
  },

  email : {
    type : EmailSchema,
    required : true,
    default : () => ({})
  },


  profile : {
    type : ProfileSchema,
    required : true,
    default : () => ({})
  },

  active : {
    type : Boolean,
    default : true,
  },

  google : {
    type : googleSchema,
    required : false,
    default : () => ({})
  }



}, {
  timestamps : true,
});



// Pre-save hook to hash the password if it's modified
/* userSchema.pre('save' , function (this : UserModel , next){
  const user  = this;
  if(user && user.isModified('password')){
    bcrypt.genSalt(10, (err, salt) => {
      if(err){
        return err;
      }
      bcrypt.hash(user.password, salt, (err, hash) => {
        if(err){
          return err;
        }
        user.password = hash;
        next();
      });
    });
  }else {
    next();
  }
})
 */

/* userSchema.methods.comparePassword = function(plaintext : string , callback : (err : Error | null , same : boolean | null) => void) {
  return callback(null , bcrypt.compareSync(plaintext, this.password));
} */

export const Users : Model<UserModel> = mongoose.model<UserModel>('Users', userSchema)