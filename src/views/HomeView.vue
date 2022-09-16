<script setup>
import { useMessageStore } from '../stores/MessageStore';
import { useRoomStore } from '../stores/RoomStore';
const messageStore = useMessageStore();
const roomStore = useRoomStore();
</script>

<template>
  <vue-advanced-chat
    :current-user-id="currentUserId"
    :rooms="JSON.stringify(rooms)"
    :messages="JSON.stringify(messages)"
    :room-actions="JSON.stringify(roomActions)"
    :height="'calc(100vh - 5vh)'"
    :rooms-loaded="true"
    :messagesLoaded="messagesLoaded"
    @send-message="sendMessage($event.detail[0])"
    @fetch-messages="onFetchMessages"
  />
</template>

<script>
import { register } from 'vue-advanced-chat';
register();

export default {
  data() {
    return {
      currentUserId: '1234',
      rooms: this.roomStore.rooms,
      roomsLoaded: true,
      messagesLoaded: false,
      loadingRooms: false,
      messages: [],
      roomActions: [
        { name: 'inviteUser', title: 'Invite User' },
        { name: 'removeUser', title: 'Remove User' },
        { name: 'deleteRoom', title: 'Delete Room' },
      ],
    };
  },
  methods: {
    async sendMessage({ content, roomId, files, replyMessage }) {
      this.messages = await this.messageStore.addMessage(
        content,
        roomId,
        files,
        replyMessage,
        this.currentUserId
      );
      this.messagesLoaded = true;
      console.log(this.messages);
    },
    onFetchMessages() {
      setTimeout(() => {
        this.messages = this.messageStore.messages
        this.messagesLoaded = true;
      });
    },
 
  },
};
</script>
