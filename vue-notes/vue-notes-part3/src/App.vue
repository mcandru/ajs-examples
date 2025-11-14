<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { isLoggedIn, isLoading, checkAuth } from "@/stores/auth";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
onMounted(async () => {
  await checkAuth();
  if (!isLoggedIn.value && !isLoading.value) {
    router.push("/login");
  }
});
</script>

<template>
  <h1>Notes</h1>

  <div v-if="isLoading">Loading...</div>
  <div v-else>
    <nav>
      <RouterLink to="/">Notes</RouterLink>
      <RouterLink v-if="!isLoggedIn" to="/login">Login</RouterLink>
      <RouterLink v-if="!isLoggedIn" to="/register">Register</RouterLink>
      <RouterLink v-if="isLoggedIn" to="/profile">Profile</RouterLink>
    </nav>

    <RouterView />
  </div>
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
