<template>
  <div>
    <h1>App</h1>
    <nav v-if="userStore.loadingSesion !== null">
      <router-link to="/" v-if="userStore.userData">Home</router-link> |
      <router-link to="/login" v-if="!userStore.userData">Login</router-link> |
      <router-link to="/register" v-if="!userStore.userData">Register</router-link> |
      <button @click="handleLogout" v-if="userStore.userData">Logout</button>
    </nav>
    <div v-else>
      Loading user...
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useUserStore } from './stores/user';

const userStore = useUserStore();
const router = useRouter();

const handleLogout = async () => {
  await userStore.logoutUser();
  router.push('/login');
};
</script>
