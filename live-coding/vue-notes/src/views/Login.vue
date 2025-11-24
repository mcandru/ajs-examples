<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import { login } from "@/stores/auth";
import { useRouter } from "vue-router";

const router = useRouter();
const email = ref("");
const password = ref("");

const handleSubmit = async () => {
  await login(email.value, password.value);
  email.value = "";
  password.value = "";
  router.push("/");
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <input type="email" placeholder="example@test.com" v-model="email" />
    <input type="password" placeholder="password" v-model="password" />
    <button type="submit">Login</button>
  </form>
</template>
