<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { login } from "@/stores/auth";

const router = useRouter();

const email = ref("");
const password = ref("");
const isSubmitting = ref(false);

const handleSubmit = async () => {
  isSubmitting.value = true;
  await login(email.value, password.value);
  isSubmitting.value = false;
  router.push("/");
};
</script>

<template>
  <h1>Login</h1>

  <div>
    <form @submit.prevent="handleSubmit">
      <input type="email" placeholder="you@example.com" v-model="email" />
      <input type="password" placeholder="Password" v-model="password" />
      <button type="submit" :disabled="isSubmitting">Login</button>
    </form>
  </div>
</template>
