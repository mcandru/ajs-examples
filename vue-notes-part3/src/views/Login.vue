<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { authStore } from "@/stores/auth";

const router = useRouter();

const email = ref("");
const password = ref("");

const handleSubmit = async () => {
  await authStore.login(email.value, password.value);
  router.push("/");
};
</script>

<template>
  <h1>Login</h1>

  <div v-if="authStore.state.isLoggedIn">
    <p>You are logged in!</p>
  </div>
  <div v-else-if="authStore.state.isLoading">
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
