// stores/RoomStore.js
import { defineStore } from "pinia/dist/pinia";
import { useUserStore } from "./UserStore";
import dog_profile from "../assets/imgs/dog_profile.jpg";
export const useRoomStore = defineStore("RoomStore", () => {
  const userStore = useUserStore();

  const rooms = [
    {
      roomId: 1,
      roomName: "만금이",
      avatar: dog_profile,
      unreadCount: 0,
      index: 0,
      lastMessage: {
        _id: "1",
        content: "Hello~" + userStore.username,
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
      currentUserId: userStore.userId,
    },
  ];
  function updateRoomMessage(chat) {
    //console.log(chat);
    const room = rooms.find((room) => room.roomId == chat.roomId);
    // console.log(room);
    // console.log(rooms[0].roomId == chat.roomId);
    room.lastMessage = chat;
  }
  function addRoom(userId) {
    const newUser = userStore.findUser(userId);
    const myInfo = userStore.findUser(userStore.userId);
    const newRoom = {
      roomId: 1,
      roomName: newUser.username,
      avatar: newUser.avatar,
      unreadCount: 0,
      index: 0,
      lastMessage: null,
      users: [newUser, myInfo],
      typingUsers: [userStore.userId],
      currentUserId: userStore.userId,
    };
    this.rooms = [...this.rooms, newRoom];
    return this.rooms;
  }
  return { rooms, updateRoomMessage, addRoom };
});
