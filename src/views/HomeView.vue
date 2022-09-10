<script setup>
import { useMessageStore } from '../stores/MessageStore';
const messageStore = useMessageStore();
</script>

<template>
  <vue-advanced-chat
    :current-user-id="currentUserId"
    :rooms="JSON.stringify(rooms)"
    :messages="JSON.stringify(messages)"
    :room-actions="JSON.stringify(roomActions)"
    :height="'calc(100vh - 5vh)'"
    :rooms-loaded="roomsLoaded"
    :messagesLoaded="messagesLoaded"
    @send-message="sendMessage($event.detail[0])"
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
          currentUserId: this.currentUserId,
        },
      ],
      roomsLoaded: true,
      messagesLoaded: true,
      loadingRooms: false,
      messages: this.messageStore.messages,
      roomActions: [
        { name: 'inviteUser', title: 'Invite User' },
        { name: 'removeUser', title: 'Remove User' },
        { name: 'deleteRoom', title: 'Delete Room' },
      ],
    };
  },
  methods: {
    sendMessage({ content, roomId, files, replyMessage }) {
      this.messages = this.messageStore.addMessage(
        content,
        roomId,
        files,
        replyMessage,
        this.currentUserId
      );
      console.log(this.messages);
    },
  },
};
</script>
