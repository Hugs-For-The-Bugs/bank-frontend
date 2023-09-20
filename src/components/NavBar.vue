<script setup lang="ts">
import { RouterLink } from 'vue-router'

import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue';
import { loggedIn } from '../model'

const route = useRoute()
const router = useRouter()

function logout() {
  document.cookie = 'SESSIONID' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  window.location.reload()
}

</script>

<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-light sticky-top px-4 d-flex justify-content-between">
      <RouterLink to="/home" class="navbar-brand text-primary">The Agile Bank</RouterLink>
      <div>
        <RouterLink v-if="!loggedIn" to="/login" class="btn">Login</RouterLink>
        <RouterLink v-if="!loggedIn" to="/create-account" class="btn ">Create Account</RouterLink>
        <button v-if="loggedIn" class="btn" @click="logout">Logout</button>
        <button type="button" class="btn ">Help</button>
      </div>

    </nav>
  </div>
</template>

<style></style>../util