<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import NavBar from './components/NavBar.vue'
import SideBar from './components/SideBar.vue';
import { onBeforeMount } from 'vue';
import { loggedIn } from './model'

const router = useRouter()

onBeforeMount(() => {
  console.log("before mounted")
  if (document.cookie.includes('SESSIONID')) {
    loggedIn.value = true
    router.replace({ name: "AccountDetails" })
  }
  else {
    loggedIn.value = false
    router.replace({ name: "Home" })
  }

})



</script>

<template>
  <NavBar />
  <div class="d-flex">
    <SideBar />
    <RouterView />
  </div>
</template>

<style scoped></style>