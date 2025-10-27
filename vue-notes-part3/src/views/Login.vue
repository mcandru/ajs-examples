<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";

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
  } catch (error) {
    console.error("Login failed:", error);
  }
};

onMounted(() => {
  // Check if user is already logged in
  const checkLogin = async () => {
    isLoading.value = true;
    try {
      const response = await axios.get("/api/auth/me");
      isLoggedIn.value = response.data.authenticated;
    } catch (error) {
      console.error("Error checking login status:", error);
    } finally {
      isLoading.value = false;
    }
  };
  checkLogin();
});
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
