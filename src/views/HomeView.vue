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
    :room-id="roomId"
    :message-selection-actions="JSON.stringify(messageSelectionActions)"
    @send-message="sendMessage($event.detail[0])"
    @fetch-messages="fetchMessages($event.detail[0])"
    @add-room="addRoom($event.detail[0])"
    @room-action-handler="menuActionHandler($event.detail[0])"
    @message-selection-action-handler="
				messageSelectionActionHandler($event.detail[0])
			"
    @delete-message="deleteMessage($event.detail[0])"
    @edit-message="editMessage($event.detail[0])"
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
      messageSelectionActions: [{ name: 'deleteMessages', title: 'Delete' }],
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
        // { name: 'inviteUser', title: 'Invite User' },
        // { name: 'removeUser', title: 'Remove User' },
        { name: 'deleteRoom', title: 'Delete Room' },
      ],
      messageSelectionActions: [{ name: 'deleteMessages', title: 'Delete' }],
      roomId : '',
      
    };
  },
  methods: {
    async sendMessage({ content, roomId, files, replyMessage }) {
      await this.messageStore.addMessage(
        content,
        roomId,
        files,
        replyMessage,
        this.currentUserId
      );
      this.messagesLoaded = true;
      this.messages = this.messageStore.getRoomMessages(roomId)
    },
    fetchMessages({ room, options = {} }) {
      setTimeout(async () => {
        this.roomId = room.roomId
        this.messages=  await this.messageStore.getRoomMessages(room.roomId);
        this.messagesLoaded = true;
      });
    },
    addRoom() {
			this.addNewRoom = true
		},
    async createRoom () {
      const newUserId= await this.userStore.addUser(this.addRoomUsername);
      this.addNewRoom = false;
      this.addRoomUsername = ''
      const newRoomList = await this.roomStore.addRoom(newUserId);
      this.rooms = newRoomList;
    },
    menuActionHandler({ action, roomId }) {
			switch (action.name) {
				// case 'inviteUser':
				// 	return this.inviteUser(roomId)
				// case 'removeUser':
				// 	return this.removeUser(roomId)
				case 'deleteRoom':
					return this.deleteRoom(roomId)
			}
		},
    messageSelectionActionHandler({ action, messages, roomId }) {
			switch (action.name) {
				case 'deleteMessages':
					messages.forEach(message => {
						this.deleteMessage({ message, roomId })
					})
			}
		},
    deleteRoom (roomId) {
      this.rooms = this.roomStore.deleteRoom(roomId);
      this.roomId = this.rooms[0].roomId
    },
    deleteMessage({message, roomId}) {
      const newMessage =  this.messageStore.deleteMessage(message._id)
      this.messages= this.messageStore.getRoomMessages(roomId);
    },
    editMessage({ messageId, newContent, roomId, files }) {
      const newMessage = { edited: new Date() }
      this.messageStore.editMessage(messageId, newContent)
      this.messages= this.messageStore.getRoomMessages(roomId);
    }
  },
};
</script>
