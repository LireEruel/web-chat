import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import './assets/main.css';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(VueSweetalert2);
app.mount('#app');
