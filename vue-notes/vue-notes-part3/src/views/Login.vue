<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { login, isLoggedIn, isLoading } from "@/stores/auth";

const router = useRouter();

const email = ref("");
const password = ref("");

const handleSubmit = async () => {
  await login(email.value, password.value);
  router.push("/");
};
</script>

<template>
  <h1>Login</h1>

  <div v-if="isLoggedIn">
    <p>You are logged in!</p>
  </div>
  <div v-else-if="isLoading">
    <p>Loading...</p>
  </div>
  <div v-else>
    <form @submit.prevent="handleSubmit">
      <input type="text" placeholder="you@example.com" v-model="email" />
      <input type="password" placeholder="Password" v-model="password" />
      <button type="submit">Login</button>
    </form>
  </div>
</template>
