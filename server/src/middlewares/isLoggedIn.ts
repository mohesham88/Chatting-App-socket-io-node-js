import {Express , Request , Response , NextFunction} from "express";






export function isLoggedInMiddleware (req : Request, res : Response, next : NextFunction) {
  console.log(req.user)
  if(req.user){
    next();
  }else 
    res.status(401).json({
      message : "User is not authenticated",
    })
}