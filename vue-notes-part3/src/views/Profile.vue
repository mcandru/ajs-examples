<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import type { User } from "@/types/index.ts";
import { authStore } from "@/stores/auth";

const profile = ref<User | null>(null);

onMounted(async () => {
  await authStore.checkAuth();
  profile.value = authStore.state.user;
});

const router = useRouter();

const logout = async () => {
  await authStore.logout();
  router.push("/");
};
</script>

<template>
  <div v-if="authStore.state.isLoggedIn && profile">
    <h1>{{ profile.email }}'s Profile</h1>
    <p><strong>Email:</strong> {{ profile.email }}</p>
    <button @click="logout">Logout</button>
  </div>
  <div v-else-if="authStore.state.isLoading">
    <p>Loading...</p>
  </div>
  <div v-else>
    <p>Not logged in</p>
  </div>
</template>
