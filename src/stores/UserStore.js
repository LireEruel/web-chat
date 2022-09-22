// stores/UserStore.js
import { defineStore } from "pinia/dist/pinia";
import logo from "@/assets/logo.svg";
export const useUserStore = defineStore("UserStore", {
  state: () => {
    return {
      username: "",
      password: "",
      isLoggedIn: false,
      userId: "1234",
      avatar: "@/assets/logo.svg",
      status: {
        state: "online",
        lastChanged: "today, 14:30",
      },
    };
  },
  actions: {
    login(username) {
      this.username = username;
    },
  },
});
