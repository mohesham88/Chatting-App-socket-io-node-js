import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

export const errorHandlerMiddleware = (err : Error , req : Request, res : Response, next : NextFunction) => {
  console.log(err);
  res.status(500).json({
    message : err.message,
  })
}