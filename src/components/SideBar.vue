<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
const router = useRouter()


</script>

<template>
  <nav class="nav nav-pills flex-column sticky-top sticky-left m-2 p-2 border rounded" style="width: 15rem">
    <RouterLink to="/account-details" class="nav-link" v-bind:class="{ active: router.currentRoute.value.path == '/account-details' }">Account Details</RouterLink>
    <RouterLink to="/transfer" class="nav-link" v-bind:class="{ active: router.currentRoute.value.path == '/transfer' }">Transfer</RouterLink>
    <RouterLink to="/withdraw" class="nav-link" v-bind:class="{ active: router.currentRoute.value.path == '/withdraw' }">Withdraw</RouterLink>
    <RouterLink to="/deposit" class="nav-link" v-bind:class="{ active: router.currentRoute.value.path == '/deposit' }">Deposit</RouterLink>
    <RouterLink to="/settings" class="nav-link" v-bind:class="{ active: router.currentRoute.value.path == '/settings' }">Settings</RouterLink>
  </nav>
</template>

<style></style>