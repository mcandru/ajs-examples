<script setup lang="ts">
import { ref } from "vue";
import { register } from "@/stores/auth";
import { useRouter } from "vue-router";

const router = useRouter();
const email = ref("");
const password = ref("");
const isSubmitting = ref(false);

const handleSubmit = async () => {
  isSubmitting.value = true;
  await register(email.value, password.value);
  isSubmitting.value = false;
  router.push("/");
};
</script>

<template>
  <h1>Register</h1>

  <form @submit.prevent="handleSubmit">
    <input type="email" placeholder="you@example.com" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
    <button type="submit" :disabled="isSubmitting">Register</button>
  </form>
</template>
