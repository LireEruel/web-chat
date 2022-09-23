// stores/UserStore.js
import { defineStore } from "pinia/dist/pinia";
import logo from "@/assets/logo.svg";
export const useUserStore = defineStore("UserStore", {
  state: () => {
    return {
      username: localStorage.getItem("username") || "",
      password: "",
      isLoggedIn: false,
      userId: "1234",
      avatar: logo,
      status: {
        state: "online",
        lastChanged: "today, 14:30",
      },
    };
  },
  actions: {
    login(username) {
      this.username = username;
      localStorage.setItem("username", username);
    },
  },
});
