<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { store } from '../store'
</script>

<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-light sticky-top px-4 d-flex justify-content-between">
      <RouterLink v-if="!store.login" to="/home" class="navbar-brand text-primary">The Agile Bank</RouterLink>
      <div>
        <RouterLink v-if="!store.login" to="/login" class="btn">Login</RouterLink>
        <RouterLink v-if="!store.login" to="/create-account" class="btn ">Create Account</RouterLink>
        <button v-if="store.login" class="btn" @click="store.userLogout">Logout</button>
        <button type="button" class="btn ">Help</button>
      </div>

    </nav>
  </div>
</template>

<style></style>