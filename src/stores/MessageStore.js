// stores/MessageStore.js
import { defineStore } from "pinia/dist/pinia";
import util from "../function/util";
import { useRoomStore } from "./RoomStore";
import { useUserStore } from "./UserStore";
export const useMessageStore = defineStore("MessageStore", () => {
  const roomStore = useRoomStore();
  const user = useUserStore();
  let lastIndex = 1;
  let messages = [
    {
      _id: "1",
      content: "Hello~" + user.username,
      senderId: "4321",
      username: "John Doe",
      timestamp: "23:18",
      saved: true,
      distributed: false,
      seen: false,
      new: true,
      date: "25 April",
    },
  ];
  function addMessage(content, roomId, files, replyMessage, senderId) {
    lastIndex++;
    const chat = {};
    chat.content = content;
    chat.roomId = roomId;
    chat.files = files;
    chat.replyMessage = replyMessage;
    chat._id = lastIndex;
    chat.date = util.getDate();
    chat.timestamp = util.getTimeStamp();
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
