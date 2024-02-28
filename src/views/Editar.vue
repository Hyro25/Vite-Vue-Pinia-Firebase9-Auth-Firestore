<template>
    <div>
        <h1>Editar id: route.params</h1>
        <form @submit.prevent="handleSubmit">
            <input type="text" placeholder="Ingrese URL" v-model="url">
            <button type="submit">Editar</button>
        </form>
    </div>
</template>

<script setup>
import {useRoute} from 'vue-router'
import {onMounted } from 'vue'
import {useDatabaseStore} from '../stores/database'
import {ref} from 'vue'


const databaseStore = useDatabaseStore()

const route = useRoute()
// console.log(route.params)

const  handleSubmit = () => {
 // Validaciones de el input
 databaseStore.updateUrl(route.params.id, url.value)
}

const url = ref('')

onMounted(async() => {
    try {
        url.value = await databaseStore.leerUrl(route.params.id)
    } catch (error) {
        console.log(error)
    }
    
})
</script>

