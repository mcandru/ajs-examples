<script setup lang="ts">
import { useRouter } from "vue-router";
import { isLoggedIn, user, isLoading, logout } from "@/stores/auth";

const router = useRouter();

const handleLogout = async () => {
  await logout();
  router.push("/login");
};
</script>

<template>
  <div v-if="isLoggedIn && user">
    <h1>{{ user.email }}'s Profile</h1>
    <p><strong>Email:</strong> {{ user.email }}</p>
    <button @click="handleLogout">Logout</button>
  </div>
  <div v-else-if="isLoading">
    <p>Loading...</p>
  </div>
  <div v-else>
    <p>Not logged in</p>
  </div>
</template>
