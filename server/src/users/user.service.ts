import {Request , Response } from 'express';
import { Users } from './user.model';



export const getAllUsers = async function() {
  const users = await Users.find();

  return users;
}