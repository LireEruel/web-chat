// stores/MessageStore.js
import { defineStore } from 'pinia/dist/pinia';

export const useMessageStore = defineStore('MessageStore', {
  state: () => {
    return {
      lastIndex: 2,
      messages: [
        {
          _id: '1',
          content: 'Last message received',
          senderId: '1234',
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
  actions: {
    addMessage(content, roomId, files, replyMessage, senderId) {
      this.lastIndex++;
      const time = new Date();
      console.log(time.getHours() + ':' + time.getMinutes());
      const chat = {};
      chat.content = content;
      chat.roomId = roomId;
      chat.files = files;
      chat.replyMessage = replyMessage;
      chat._id = this.lastIndex;
      chat.timestamp = time.getHours() + ':' + time.getMinutes();
      chat.senderId = senderId;
      chat.saved = true;
      chat.seen = false;
      chat.new = true;
      chat.distributed = false;
      this.messages = [...this.messages, chat];

      return this.messages;
    },
    getMessage() {
      return this.messages;
    },
  },
});
