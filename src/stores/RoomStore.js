// stores/RoomStore.js
import { defineStore } from "pinia/dist/pinia";
import { useUserStore } from "./UserStore";
import { useMessageStore } from "./MessageStore";
import dog_profile from "../assets/imgs/dog_profile.jpg";
import camel_profile from "../assets/imgs/camel.png";
import util from "../function/util";
export const useRoomStore = defineStore("RoomStore", () => {
  const userStore = useUserStore();
  const messageStore = useMessageStore();
  let lastIndex = "3";
  const myInfo = userStore.findUser(userStore.userId);
  const rooms = [
    {
      roomId: "1",
      roomName: "만금이",
      avatar: dog_profile,
      unreadCount: 0,
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
          _id: "4321",
          username: "만금이",
          avatar: "@/assets/logo.svg",
          status: {
            state: "online",
            lastChanged: "today, 14:30",
          },
        },
        myInfo,
      ],
      typingUsers: [userStore.userId],
      currentUserId: userStore.userId,
    },
    {
      roomId: "2",
      roomName: "낙타",
      avatar: camel_profile,
      unreadCount: 0,
      lastMessage: {
        _id: "2",
        roomId: "2",
        content: "Room created",
        date: util.getDate(),
        system: true,
        timestamp: "07:07",
      },
      users: [
        myInfo,
        {
          _id: "4321",
          username: "낙타",
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
    const room = this.rooms.find((room) => room.roomId == chat.roomId);
    // console.log(room);
    // console.log(rooms[0].roomId == chat.roomId);
    room.lastMessage = chat;
  }
  function addRoom(userId) {
    const newUser = userStore.findUser(userId);
    const myInfo = userStore.findUser(userStore.userId);
    this.lastIndex += 1;
    const newRoom = {
      roomId: this.lastIndex,
      roomName: newUser.username,
      avatar: newUser.avatar,
      unreadCount: 0,
      index: 0,
      lastMessage: { content: "room created", timestamp: util.getTimeStamp() },
      users: [newUser, myInfo],
      typingUsers: [userStore.userId],
      currentUserId: userStore.userId,
    };
    messageStore.addRoomCreatedMessage(this.lastIndex);
    this.rooms = [...this.rooms, newRoom];
    return this.rooms;
  }
  function deleteRoom(roomId) {
    const newRooms = this.rooms.filter((room) => room.roomId !== roomId);
    this.rooms = newRooms;
    return newRooms;
  }
  return { rooms, lastIndex, updateRoomMessage, addRoom, deleteRoom };
});
