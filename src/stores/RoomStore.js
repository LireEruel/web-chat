// stores/RoomStore.js
import { defineStore } from 'pinia/dist/pinia';
import { useUserStore } from './UserStore';

export const useRoomStore = defineStore('RoomStore', () => {
  const user = useUserStore();

  const rooms = [
    {
      roomId: 1,
      roomName: '만금이',
      avatar: 'assets/imgs/people.png',
      unreadCount: 0,
      index: 0,
      lastMessage: {
        _id: '1',
        content: 'Last message received',
        senderId: '4321',
        username: 'John Doe',
        timestamp: '10:20',
        saved: true,
        distributed: false,
        seen: false,
        new: true,
      },
      users: [
        {
          _id: '1234',
          username: 'John Doe',
          avatar: 'assets/imgs/doe.png',
          status: {
            state: 'online',
            lastChanged: 'today, 14:30',
          },
        },
        {
          _id: '4321',
          username: 'John Snow',
          avatar: 'assets/imgs/snow.png',
          status: {
            state: 'offline',
            lastChanged: '14 July, 20:00',
          },
        },
      ],
      typingUsers: [4321],
      currentUserId: user.userId,
    },
  ];
  function updateRoomMessage(chat) {
    console.log(chat);
    const room = rooms.find((room) => room.roomId == chat.roomId);
    console.log(room);
    console.log(rooms[0].roomId == chat.roomId);
    room.lastMessage = chat;
  }
  return { rooms, updateRoomMessage };
});
