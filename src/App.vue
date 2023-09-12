<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import SideBar from './components/SideBar.vue';
import { store } from './store'

</script>

<template>
  <NavBar />
  <div class="d-flex">
    <SideBar v-if="store.login" />
    <RouterView />
  </div>
</template>

<style scoped></style>