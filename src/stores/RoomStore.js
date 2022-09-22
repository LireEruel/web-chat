// stores/RoomStore.js
import { defineStore } from "pinia/dist/pinia";
import { useUserStore } from "./UserStore";
import dog_profile from "../assets/imgs/dog_profile.jpg";
export const useRoomStore = defineStore("RoomStore", () => {
  const user = useUserStore();

  const rooms = [
    {
      roomId: 1,
      roomName: "만금이",
      avatar: dog_profile,
      unreadCount: 0,
      index: 0,
      lastMessage: {
        _id: "1",
        content: "Hello~" + user.username,
        senderId: "4321",
        username: "만금이",
        timestamp: "10:20",
        saved: true,
        distributed: false,
        seen: false,
        new: true,
      },
      users: [
        {
          _id: "1234",
          username: "만금이",
          avatar: "@/assets/logo.svg",
          status: {
            state: "online",
            lastChanged: "today, 14:30",
          },
        },
        {
          _id: "4321",
          username: "John Snow",
          avatar: "@/assets/logo.svg",
          status: {
            state: "online",
            lastChanged: "14 July, 20:00",
          },
        },
      ],
      typingUsers: [1234],
      currentUserId: user.userId,
    },
  ];
  function updateRoomMessage(chat) {
    //console.log(chat);
    const room = rooms.find((room) => room.roomId == chat.roomId);
    // console.log(room);
    // console.log(rooms[0].roomId == chat.roomId);
    room.lastMessage = chat;
  }
  return { rooms, updateRoomMessage };
});
