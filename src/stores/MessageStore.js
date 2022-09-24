// stores/MessageStore.js
import { defineStore } from "pinia/dist/pinia";
import util from "../function/util";
import { useRoomStore } from "./RoomStore";
import { useUserStore } from "./UserStore";
export const useMessageStore = defineStore("MessageStore", () => {
  const roomStore = useRoomStore();
  const UserStore = useUserStore();
  let lastIndex = 1;
  let messages = [
    {
      _id: "0",
      roomId: "1",
      content: "Room created",
      date: "25 April",
      system: true,
    },
    {
      _id: "1",
      roomId: "1",
      content: "Hello~" + UserStore.username,
      senderId: "4321",
      username: "John Doe",
      timestamp: "23:18",
      saved: true,
      distributed: false,
      seen: false,
      new: true,
      date: "25 April",
    },
    {
      _id: "2",
      roomId: "2",
      content: "Room created",
      date: util.getDate(),
      system: true,
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
    roomStore.updateRoomMessage(chat);
    return this.messages;
  }
  function addRoomCreatedMessage(roomId) {
    lastIndex++;
    const chat = {};
    chat._id = lastIndex;
    chat.roomId = roomId;
    chat.content = "Room created";
    chat.date = util.getDate();
    chat.timestamp = util.getTimeStamp();
    chat.system = true;
    this.messages = [...this.messages, chat];
  }
  function getMessage() {
    return this.messages;
  }
  function getRoomMessages(roomId) {
    console.log(this.messages.filter((message) => message.roomId == roomId));
    return this.messages.filter((message) => message.roomId == roomId);
  }

  return {
    messages,
    addMessage,
    getMessage,
    getRoomMessages,
    addRoomCreatedMessage,
  };
});
