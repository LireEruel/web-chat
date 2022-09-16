// stores/UserStore.js
import { defineStore } from 'pinia/dist/pinia';

export const useUserStore = defineStore('UserStore', {
  state: () => {
    return {
      name: '',
      password: '',
      isLoggedIn: false,
      userId: '1234',
    };
  },
  actions: {
    login(name) {
      this.name = name;
    },
  },
});
