<template>
  <vue-advanced-chat
    :current-user-id="currentUserId"
    :rooms="JSON.stringify(rooms)"
    :messages="JSON.stringify(messages)"
    :room-actions="JSON.stringify(roomActions)"
    :height="'calc(100vh - 5vh)'"
    :rooms-loaded="roomsLoaded"
    :messagesLoaded="messagesLoaded"
  />
</template>

<script>
import { register } from 'vue-advanced-chat';
register();

export default {
  data() {
    return {
      currentUserId: '1234',
      rooms: [
        {
          roomId: 1,
          roomName: 'Room 1',
          avatar: 'assets/imgs/people.png',
          unreadCount: 4,
          index: 3,
          lastMessage: {
            content: 'Last message received',
            senderId: 1234,
            username: 'John Doe',
            timestamp: '10:20',
            saved: true,
            distributed: false,
            seen: false,
            new: true,
          },
          users: [
            {
              _id: 1234,
              username: 'John Doe',
              avatar: 'assets/imgs/doe.png',
              status: {
                state: 'online',
                lastChanged: 'today, 14:30',
              },
            },
            {
              _id: 4321,
              username: 'John Snow',
              avatar: 'assets/imgs/snow.png',
              status: {
                state: 'offline',
                lastChanged: '14 July, 20:00',
              },
            },
          ],
          typingUsers: [4321],
        },
      ],
      roomsLoaded: true,
      messagesLoaded: true,
      loadingRooms: false,
      messages: [
        {
          content: 'Last message received',
          senderId: 1234,
          username: 'John Doe',
          timestamp: '10:20',
          saved: true,
          distributed: false,
          seen: false,
          new: true,
        },
      ],
    };
  },
};
</script>
