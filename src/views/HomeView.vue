<script setup>
import { useMessageStore } from '../stores/MessageStore';
import { useRoomStore } from '../stores/RoomStore';
import { useUserStore } from '../stores/UserStore';
import "../assets/chat_view.css";
const messageStore = useMessageStore();
const roomStore = useRoomStore();
const userStore = useUserStore();
</script>

<template>
  	<form v-if="addNewRoom" @submit.prevent="createRoom" :class="{newRoomForm : true}">
			<input v-model="addRoomUsername" type="text" placeholder="Add username" />
			<button type="submit" :disabled="disableForm || !addRoomUsername">
				Create Room
			</button>
			<button class="button-cancel" @click="addNewRoom = false">Cancel</button>
		</form>

  <vue-advanced-chat
    :current-user-id="currentUserId"
    :rooms="JSON.stringify(rooms)"
    :messages="JSON.stringify(messages)"
    :room-actions="JSON.stringify(roomActions)"
    :height="'calc(100vh - 10vh)'"
    :rooms-loaded="true"
    :messagesLoaded="messagesLoaded"
    @send-message="sendMessage($event.detail[0])"
    @fetch-messages="onFetchMessages"
    @add-room="addRoom($event.detail[0])"
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
      disableForm: false,
			addNewRoom: null,
			addRoomUsername: '',
			inviteRoomId: null,
			invitedUsername: '',
			removeRoomId: null,
			removeUserId: '',
			removeUsers: [],
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
    addRoom() {
			//this.resetForms()
			this.addNewRoom = true
		},
    async createRoom () {
      /**
       *  todo list 
       *  1. add user해서 새로운 유저 id 받아오기
       *  2. 새 유저 id, 지금 유저 id로 새 방 만들기
       * 
       */
      const newUserId= await this.userStore.addUser(this.addRoomUsername);
      this.addNewRoom = false;
      this.addRoomUsername = ''
      
      /**
       *방 목록 업데이트
       */
    }
  },
};
</script>
