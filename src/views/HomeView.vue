<template>
    <div class="position-absolute top-50 start-50 translate-middle align-items-center">
        <h1 class="text-center">Hugs For The Bugs - Bank</h1>
        <div class="d-flex align-items-center">
            <div class="flex-shrink-0">
                <img src="resources\house.png" width="500" alt="Bank">
            </div>
            <div class="flex-shrink-0 border mx-4">
                <img src="resources\house 2.png" width="500" height="400" alt="Bank2">
            </div>

        </div>
        <div class="mt-3">
            <RouterLink to="/login"><button class="btn btn-primary">Login</button></RouterLink>
        </div>
        <div class="mt-3">
            <RouterLink to="/create-account"><button class="btn btn-primary">Create Account</button></RouterLink>
        </div>




    </div>
</template>

<script setup lang="ts">
import { loggedIn } from '@/model'
import { onBeforeMount } from 'vue';
import { useRouter } from 'vue-router'

const router = useRouter()

onBeforeMount(() => {
    if (loggedIn.value) {
        router.replace({ name: "AccountDetails" });
    }
})
</script>

<style scoped></style>