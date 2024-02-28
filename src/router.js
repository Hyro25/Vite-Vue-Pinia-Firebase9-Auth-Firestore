import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "./stores/user";

import Home from "./views/Home.vue";
import Editar from "./views/Editar.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";

const requireAuth = async (to, from, next) => {
  const userStore = useUserStore();
  userStore.loadingSesion = true;
  try {
    // Resolución de la promesa antes de continuar
    await userStore.currentUser(); 
    if (userStore.userData) {
      next();
    } else {
      next("/login");
    }
  } catch (error) {
    console.log(error);
  } finally {
    userStore.loadingSesion = false;
  }
};


const routes = [
  { path: "/", component: Home, beforeEnter: requireAuth },
  { path: "/editar/:id", component: Editar, beforeEnter: requireAuth },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
