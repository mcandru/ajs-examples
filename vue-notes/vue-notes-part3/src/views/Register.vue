<script setup lang="ts">
import { ref } from "vue";
import authStore from "@/stores/auth";
import { useRouter } from "vue-router";

const router = useRouter();
const email = ref("");
const password = ref("");

const handleSubmit = async () => {
  await authStore.register(email.value, password.value);
  router.push("/");
};
</script>

<template>
  <h1>Register</h1>

  <form @submit.prevent="handleSubmit">
    <input type="text" placeholder="you@example.com" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
    <button type="submit">Register</button>
  </form>
</template>
