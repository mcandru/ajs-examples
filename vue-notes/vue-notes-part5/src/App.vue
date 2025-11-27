<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { isLoggedIn, isLoading } from "@/stores/auth";
</script>

<template>
  <h1>Notes</h1>

  <nav v-if="!isLoading">
    <RouterLink to="/" v-if="isLoggedIn">Notes</RouterLink>
    <RouterLink v-if="!isLoggedIn" to="/login">Login</RouterLink>
    <RouterLink v-if="!isLoggedIn" to="/register">Register</RouterLink>
    <RouterLink v-if="isLoggedIn" to="/profile">Profile</RouterLink>
  </nav>

  <RouterView />
</template>

<style scoped>
nav {
  margin-bottom: 20px;
}
nav a {
  margin-right: 10px;
}

.router-link-exact-active {
  font-weight: bold;
}
</style>
