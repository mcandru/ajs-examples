<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import authStore from "@/stores/auth";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

onMounted(async () => {
  await authStore.checkAuth();
  if (!authStore.isLoggedIn) {
    router.push("/login");
  }
});
</script>

<template>
  <h1>Notes</h1>

  <div v-if="authStore.isLoading">Loading...</div>
  <div v-else>
    <nav>
      <RouterLink to="/">Notes</RouterLink>
      <RouterLink v-if="!authStore.isLoggedIn" to="/login">Login</RouterLink>
      <RouterLink v-if="!authStore.isLoggedIn" to="/register"
        >Register</RouterLink
      >
      <RouterLink v-if="authStore.isLoggedIn" to="/profile">Profile</RouterLink>
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
</style>
