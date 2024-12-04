import { Router } from "express";

import { Users } from "../users/user.model";

import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
} from "class-validator";
import { validationMiddleware } from "middlewares/validate";
import {
  subscribeToRooms,
  unsubscribeFromRooms,
} from "./notifications.service";
import { Rooms } from "rooms/room.model";

const app = Router();

class ManageNotificationsDTO {
  @IsString()
  @IsNotEmpty()
  deviceToken: string;
}

// enable notifications for the given user
app.post(
  "/register",
  validationMiddleware(ManageNotificationsDTO),
  async (req, res) => {
    const userId = req.user?._id;
    const deviceToken = req.body.deviceToken;

    const user = await Users.findById(userId);

    if (user && user.deviceToken.includes(deviceToken)) {
      return res.status(200).json({
        message: `Notifications already enabled for device ${deviceToken}`,
      });
    }

    const joined_rooms = (
      await Rooms.find({ participants: req.user?._id })
    ).map((room) => room.id.toString());

    console.log("joined rooms", joined_rooms);

    if (user?.deviceToken && user?.deviceToken.length >= 5) {
      // remove the oldest device token

      const oldestToken = user.deviceToken.shift();

      // unsubscribe from all topics for the oldest device token

      await unsubscribeFromRooms(
        oldestToken as string,
        joined_rooms as string[]
      );
    }

    // add the new device token
    user?.deviceToken.push(deviceToken);

    // subscribe to this device to all the rooms the user is in
    subscribeToRooms(deviceToken, joined_rooms as string[]);

    await user?.save();

    // enable notifications
    return res
      .status(200)
      .json({ message: `Notifications enabled for device ${deviceToken}` });
  }
);

export default app;
