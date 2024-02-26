
import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from './stores/user'

import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';

const requireAuth = async (to, from, next) => {
    const userStore = useUserStore();
     const user = await userStore.currentUser();
   
     if (user) {
         next();
        } else {
            router.push("/login")
         // Usuario no autenticado, redirigir al usuario a la página de inicio de sesión
       
    }
}

const routes = [
    { path: '/', component: Home, beforeEnter: requireAuth},
    { path: '/login', component: Login },
    { path: '/register', component: Register },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;