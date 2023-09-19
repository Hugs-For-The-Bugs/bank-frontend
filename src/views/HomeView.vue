<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { store } from '../store'
</script>

<template>
    <div class="position-absolute top-50 start-50 translate-middle align-items-center">
        <h1 class="text-center">Hugs For The Bugs - Bank</h1>
        <div class="d-flex align-items-center">
        <div class="flex-shrink-0">
            <img src="src\views\house.png" width="500" alt="Bank">
        </div>
        <div class="flex-shrink-0 border mx-4">
            <img src="src\views\house 2.png" width="500" height="400" alt="Bank2">
        </div>
        
        </div>
        <div class="mt-3">
            <RouterLink v-if="!store.login" to="/login"><button class="btn btn-primary">Login</button></RouterLink>
        </div>
        <div class="mt-3">
            <RouterLink v-if="!store.login" to="/create-account"><button class="btn btn-primary">Create Account</button></RouterLink>
        </div>
    
    
    
    
    </div>
    
</template>

<script setup lang="ts">
</script>

<style scoped></style>