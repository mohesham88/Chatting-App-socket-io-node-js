import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { APIError, NotFoundError } from 'rest-api-errors';



export const errorHandlerMiddleware = (err : APIError , req : Request, res : Response, next : NextFunction) => {
  
  res.status(err.status).json({
    message : err.message || err.code,
  })
}