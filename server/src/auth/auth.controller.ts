import { Express, Router, Request , Response } from "express";

import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, validationPipe, } from "../utils/validation";
import { validationMiddleware } from "middlewares/validate";


const app : Router = Router();

import {userSchema} from '../users/user.model'
import passport from "passport";


app.get('/google' , passport.authenticate('google', {
  scope : ['email', 'profile'],
}))


app.get('/google/redirect' , 
  passport.authenticate('google', {

    session : true,
    keepSessionInfo : true,
  }) , (req , res ) => {    
    res.redirect(`${process.env.REACT_CLIENT}`)
  }
)




/* 
class SingupDto {
  
  @IsString()
  @IsNotEmpty()
  username : string;


  @IsEmail()
  @IsNotEmpty()
  email : string;



  @IsStrongPassword()
  @IsNotEmpty()
  password : string;

  
  profile : Profile;
  
  
} */



/* app.post('/signup', validationMiddleware(SingupDto)  ,async (req : Request, res : Response) => {
  // const result = await validationPipe(SingupDto, { ...req.body, ...req.params });
  res.status(200).json({result : "hey"})
}) */


/* 
app.post('/signin' , (req : Request, res : Response) => {
  
})
 */

export default app;