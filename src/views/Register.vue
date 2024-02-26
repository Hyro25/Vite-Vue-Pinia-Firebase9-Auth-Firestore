<template>
    <div>
        <h1>Register</h1>
        <form @submit.prevent="handleSubmit" v-if="!loading">
            <input type="email" placeholder="Ingrese email" v-model.trim="email" autocomplete="email">
            <input type="password" placeholder="Ingrese contraseña" v-model.trim="password" autocomplete="current-password">
            <button type="submit" :disabled="userStore.loadingUser">Crear Usuario</button>
        </form>
        <p v-else>Cargando...</p>
        <p v-if="error" class="error-message">{{ error }}</p>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import { useUserStore } from '../stores/user';
    import { useRouter } from 'vue-router';

    
    const userStore = useUserStore();
    const router = useRouter();
    const error = ref(null);

    const email = ref('');
    const password = ref('');
    const loading = ref(false);

    const handleSubmit = async () => {
        if (!email.value || password.value.length < 6) {
            return alert('Llena los campos');
        }
        // loading.value = true;
        try {
            await userStore.registerUser(email.value, password.value);
             router.push('/')
            // Si el registro es exitoso, puedes redirigir al usuario a otra página o mostrar un mensaje de éxito
        } catch (error) {
            error.value = error.message;           
        // } finally {
        //     loading.value = false;
        }
    };
</script>