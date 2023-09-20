<script setup lang="ts">
import { onMounted, onUpdated, ref } from 'vue';
import { RouterLink, useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

</script>

<template>
  <div v-show="!(route.path === '/home' || route.path === '/login' || route.path === '/create-account')"
    style="min-width: 240px; height: 220px;">
    <nav class="nav nav-pills flex-column sticky-top sticky-left m-2 p-2 border rounded">
      <RouterLink to="/account-details" class="nav-link"
        v-bind:class="{ active: router.currentRoute.value.path == '/account-details' }">Account Details</RouterLink>
      <RouterLink to="/transfer" class="nav-link"
        v-bind:class="{ active: router.currentRoute.value.path == '/transfer' }">Transfer</RouterLink>
      <RouterLink to="/withdraw" class="nav-link"
        v-bind:class="{ active: router.currentRoute.value.path == '/withdraw' }">Withdraw</RouterLink>
      <RouterLink to="/deposit" class="nav-link" v-bind:class="{ active: router.currentRoute.value.path == '/deposit' }">
        Deposit</RouterLink>
      <RouterLink to="/settings" class="nav-link"
        v-bind:class="{ active: router.currentRoute.value.path == '/settings' }">Settings</RouterLink>
    </nav>
  </div>
</template>

<style></style>