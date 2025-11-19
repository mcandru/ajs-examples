<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import { isLoggedIn, checkAuth } from "@/stores/auth";

onMounted(async () => {
  await checkAuth();
});
</script>

<template>
  <h1>Notes</h1>
  <nav>
    <RouterLink to="/" class="nav-link">Notes</RouterLink>
    <RouterLink to="/login" class="nav-link" v-if="!isLoggedIn"
      >Login</RouterLink
    >
    <RouterLink to="/register" class="nav-link" v-if="!isLoggedIn"
      >Register</RouterLink
    >
    <RouterLink to="/profile" class="nav-link" v-if="isLoggedIn"
      >Profile</RouterLink
    >
  </nav>
  <RouterView />
</template>

<style scoped>
.nav-link {
  margin-right: 10px;
}
</style>
