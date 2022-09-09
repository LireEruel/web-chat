// stores/counter.js
import { defineStore } from 'pinia/dist/pinia';

export const useCounterStore = defineStore('CounterStore', {
  state: () => {
    return {
      count: 0,
    };
  },
  actions: {
    increment() {
      this.count++;
    },
  },
});
