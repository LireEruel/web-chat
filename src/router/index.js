import { createRouter, createWebHistory } from 'vue-router';
import { useCounterStore } from '../stores/CounterStore';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/home',
      name: 'home',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: HomeView,
    },
  ],
});
// router.beforeEach((to, from, next) => {
//   // we wanted to use the store here
//   if (store.isLoggedIn) next();
//   else next('/login');
// });
router.beforeEach((to) => {
  // ✅ This will work because the router starts its navigation after
  // the router is installed and pinia will be installed too
  //const counterStore = useCounterStore();
  //if (to.meta.requiresAuth && !store.isLoggedIn) return '/login';
});

export default router;
