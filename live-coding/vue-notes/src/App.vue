<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";

const isLoggedIn = ref(false);

onMounted(async () => {});
</script>

<template>
  <h1>Notes</h1>
  <nav>
    <RouterLink to="/" class="nav-link">Notes</RouterLink>
    <RouterLink to="/login" class="nav-link">Login</RouterLink>
    <RouterLink to="/register" class="nav-link">Register</RouterLink>
    <RouterLink to="/profile" class="nav-link">Profile</RouterLink>
  </nav>
  <RouterView />
</template>

<style scoped>
.nav-link {
  margin-right: 10px;
}
</style>
