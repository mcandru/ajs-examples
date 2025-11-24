<script setup lang="ts">
import { logout, user } from "@/stores/auth";
import { useRouter } from "vue-router";

const router = useRouter();

const handleLogout = async () => {
  await logout();
  router.push("/login");
};
</script>

<template>
  <div v-if="user">
    <h1>{{ user.email }}'s account</h1>
    <p>{{ user.email }}</p>
    <button @click="handleLogout">Logout</button>
  </div>
</template>
