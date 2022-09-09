<script setup>
import TheWelcome from '../components/TheWelcome.vue';
import { useCounterStore } from '../stores/CounterStore';
import { useUserStore } from '../stores/UserStore';
import { mapActions, mapState } from 'pinia';
const counterStore = useCounterStore();
</script>

<script>
export default {
  computed: {
    ...mapState(useUserStore, ['name']),
    ...mapState(useCounterStore, ['count']),
    ...mapActions(useCounterStore, ['increment']),
  },
};
</script>
<template>
  <div>{{ name }}</div>
  <div>ㅎㅇ</div>
  <div :="count">{{ count }}</div>
  <button v-on:click="increment">+</button>
</template>
