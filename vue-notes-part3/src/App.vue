<script setup lang="ts">
import { ref, onMounted } from "vue";
import { RouterLink, RouterView } from "vue-router";
import axios from "axios";

const isLoggedIn = ref(false);

onMounted(async () => {
  const response = await axios.get("/api/auth/me");
  isLoggedIn.value = response.data.authenticated;
});
</script>

<template>
  <h1>Notes</h1>

  <nav class="mb-5">
    <RouterLink class="m-1" to="/">Notes</RouterLink>
    <RouterLink v-if="!isLoggedIn" class="m-1" to="/login">Login</RouterLink>
    <RouterLink v-if="!isLoggedIn" class="m-1" to="/register"
      >Register</RouterLink
    >
    <RouterLink v-if="isLoggedIn" class="m-1" to="/profile">Profile</RouterLink>
  </nav>

  <RouterView />
</template>
