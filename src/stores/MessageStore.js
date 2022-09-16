// stores/MessageStore.js
import { defineStore } from "pinia/dist/pinia";
import { useRoomStore } from "./RoomStore";
export const useMessageStore = defineStore("MessageStore", () => {
  const roomStore = useRoomStore();
  let lastIndex = 1;
  let messages = [
    {
      _id: "1",
      content: "Last message received",
      senderId: "1234",
      username: "John Doe",
      timestamp: "10:20",
      saved: true,
      distributed: false,
      seen: false,
      new: true,
    },
  ];
  function addMessage(content, roomId, files, replyMessage, senderId) {
    lastIndex++;
    const time = new Date();
    //console.log(time.getHours() + ":" + time.getMinutes());
    const chat = {};
    chat.content = content;
    chat.roomId = roomId;
    chat.files = files;
    chat.replyMessage = replyMessage;
    chat._id = lastIndex;
    chat.timestamp = time.getHours() + ":" + time.getMinutes();
    chat.senderId = senderId;
    chat.saved = true;
    chat.seen = false;
    chat.new = true;
    chat.distributed = false;
    this.messages = [...this.messages, chat];
    console.log(this.messages);
    roomStore.updateRoomMessage(chat);
    return this.messages;
  }
  function getMessage() {
    console.log(this.messages);
    return this.messages;
  }

  return { messages, addMessage, getMessage };
});
