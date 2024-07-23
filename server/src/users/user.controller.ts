import { Express, Router, Request , Response , NextFunction } from "express";

const app : Router = Router();


app.use('/profile' , (req : Request , res : Response) => {
  return res.status(200).json(req.user);
})


export default app;


