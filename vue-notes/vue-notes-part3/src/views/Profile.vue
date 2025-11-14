<script setup lang="ts">
import { useRouter } from "vue-router";
import authStore from "@/stores/auth";

const { isLoggedIn, user, isLoading } = authStore;

const router = useRouter();

const logout = async () => {
  await authStore.logout();
  router.push("/login");
};
</script>

<template>
  <div v-if="isLoggedIn && user">
    <h1>{{ user.email }}'s Profile</h1>
    <p><strong>Email:</strong> {{ user.email }}</p>
    <button @click="logout">Logout</button>
  </div>
  <div v-else-if="isLoading">
    <p>Loading...</p>
  </div>
  <div v-else>
    <p>Not logged in</p>
  </div>
</template>
