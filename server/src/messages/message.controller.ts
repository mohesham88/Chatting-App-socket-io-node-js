import { IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";
import { Router } from "express";
import { validationMiddleware } from "middlewares/validate";
import { Rooms } from "rooms/room.model";
import Messages from "./message.model";
import { MessagesRequest, validateRoomId } from "./middleware/validateRoomId";
import { ChatSocket } from "socket";

const app: Router = Router();

app.get("/:room_id", validateRoomId, async (req: MessagesRequest, res) => {
  const room_id = req.params.room_id;
  const messages: (typeof Messages)[] = await Messages.find({ room: room_id });
  console.log(messages);
  return res.status(200).json(messages);
});

class createMessageDTO {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsUrl()
  @IsOptional()
  attatchment: string;
}

// post a message to a room
app.post(
  "/:room_id",
  validationMiddleware(createMessageDTO),
  validateRoomId,
  async (req, res) => {
    const room_id = req.params.room_id;

    const { text, attachment } = req.body;

    const createdMsg = await Messages.create({
      text,
      attachment,
      room: room_id,
      sender: {
        id: req.user?._id,
        username: req.user?.username,
        avatar: req.user?.profile.avatar,
      },
    });
    ChatSocket.sendMessageToRoom(room_id, createdMsg);
    return res.status(201).json(createdMsg);
  }
);

export default app;
