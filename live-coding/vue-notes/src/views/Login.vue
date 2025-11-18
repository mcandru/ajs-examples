<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";

const email = ref("");
const password = ref("");

const handleSubmit = async () => {
  await axios.post("/api/auth/login", {
    email: email.value,
    password: password.value,
  });
  email.value = "";
  password.value = "";
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <input type="email" placeholder="example@test.com" v-model="email" />
    <input type="password" placeholder="password" v-model="password" />
    <button type="submit">Login</button>
  </form>
</template>
