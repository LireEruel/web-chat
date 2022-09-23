// stores/UserStore.js
import { defineStore } from "pinia/dist/pinia";
import logo from "@/assets/logo.svg";
import util from "../function/util";
export const useUserStore = defineStore("UserStore", () => {
  let lastUserId = 0;
  let username = localStorage.getItem("username") || "";
  let password = "";
  let isLoggedIn = false;
  let userId = "1234";
  let avatar = logo;
  let status = {
    state: "online",
    lastChanged: "today, 14:30",
  };
  let users = [
    {
      userId: "1234",
      avatar: logo,
      status: {
        state: "online",
        lastChanged: "today, 14:30",
      },
    },
  ];

  function login(username) {
    this.username = username;
    localStorage.setItem("username", username);
  }
  function addUser(username) {
    this.lastUserId += 1;
    const newUser = {};
    newUser.userId = this.lastUserId;
    newUser.username = username;
    (newUser.avatar = logo),
      (newUser.status = {
        state: "online",
        lastChanged: "today, " + util.getTimeStamp(),
      });
    this.users.push(newUser);
    return newUser.userId;
  }
  return {
    lastUserId,
    username,
    password,
    isLoggedIn,
    userId,
    avatar,
    status,
    users,
    login,
    addUser,
  };
});
