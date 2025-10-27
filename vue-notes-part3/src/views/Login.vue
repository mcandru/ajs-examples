<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { authStore } from "@/stores/auth";

const router = useRouter();

const email = ref("");
const password = ref("");
const isLoading = ref(false);
const isLoggedIn = ref(false);

const handleSubmit = async () => {
  // Handle login logic here
  console.log("Logging in with", email.value, password.value);

  try {
    await axios.post("http://localhost:5173/api/auth/login", {
      email: email.value,
      password: password.value,
    });

    isLoggedIn.value = true;
    router.push("/");
  } catch (error) {
    console.error("Login failed:", error);
  }
};

onMounted(async () => {
  await authStore.checkAuth();
});
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
