<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { authStore } from "@/stores/auth";
import { onMounted } from "vue";

onMounted(async () => {
  await authStore.checkAuth();
});
</script>

<template>
  <h1>Notes</h1>

  <div v-if="authStore.state.isLoading">Loading...</div>
  <div v-else>
    <nav class="mb-5">
      <RouterLink class="m-1" to="/">Notes</RouterLink>
      <RouterLink v-if="!authStore.state.isLoggedIn" class="m-1" to="/login"
        >Login</RouterLink
      >
      <RouterLink v-if="!authStore.state.isLoggedIn" class="m-1" to="/register"
        >Register</RouterLink
      >
      <RouterLink v-if="authStore.state.isLoggedIn" class="m-1" to="/profile"
        >Profile</RouterLink
      >
    </nav>

    <RouterView />
  </div>
</template>
