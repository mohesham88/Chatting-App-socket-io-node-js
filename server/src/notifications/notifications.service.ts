import { Rooms } from "../rooms/room.model";

import admin from "firebase-admin";

export async function subscribeToRooms(deviceId: string, roomsIds: string[]) {
  for (const room of roomsIds) {

    admin
      .messaging()
      .subscribeToTopic(deviceId, room)
      .then((response) => {
        console.log("Successfully subscribed to topic:", response);
      })
      .catch((error) => {
        console.log("Error subscribing to topic:", error);
      });
  }
}

export async function unsubscribeFromRooms(deviceId: string, roomsIds: string[]) {
  // unsubscribe from all rooms
  for (const room of roomsIds) {
    
    admin
      .messaging()
      .unsubscribeFromTopic(deviceId, room)
      .then((response) => {
        console.log("Successfully unsubscribed from topic:", response);
      })
      .catch((error) => {
        console.log("Error unsubscribing from topic:", error);
      });
  }
  // await Notifications.unsubscribeFromAllTopics(deviceId);
}

export async function sendNotification(
  roomId: string,
  body: string,
  userId: string,
  userName: string
) {
  const condition = `'${roomId}' in topics`;
  // console.log(condition);
  const message = {
    condition,
    notification: {
      title: `New Message from ${userName}!`,
      body,
    },
    data: {
      senderId: userId, // Include sender's ID
    },
  };

  const response = await admin.messaging().send(message);

  console.log("Successfully sent message:", response);
}
