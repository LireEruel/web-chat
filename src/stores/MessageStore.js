// stores/MessageStore.js
import { defineStore } from "pinia/dist/pinia";
import util from "../function/util";
import { useRoomStore } from "./RoomStore";
import { useUserStore } from "./UserStore";
export const useMessageStore = defineStore("MessageStore", () => {
  const roomStore = useRoomStore();
  const UserStore = useUserStore();
  let lastIndex = "2";
  let messages = [
    {
      _id: "0",
      senderId: "0",
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
      senderId: "0",
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
    chat.senderId = "0";
    chat.system = true;
    this.messages = [...this.messages, chat];
  }
  function getMessage() {
    return this.messages;
  }
  function getRoomMessages(roomId) {
    return this.messages.filter((message) => message.roomId == roomId);
  }
  function deleteMessage(messageId) {
    console.log(this.messages);
    const newMessages = this.messages.filter(
      (message) => message._id != messageId
    );
    this.messages = newMessages;
    console.log(this.messages);
    return newMessages;
  }
  function editMessage(messageId, content) {
    this.messages.map((message) => {
      console.log(message);
      if (message._id == messageId) {
        message.content = content;
        message.edited = new Date();
      }
    });
    return this.messages;
  }

  return {
    messages,
    addMessage,
    getMessage,
    getRoomMessages,
    addRoomCreatedMessage,
    deleteMessage,
    editMessage,
  };
});
