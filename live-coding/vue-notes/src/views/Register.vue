<script setup lang="ts">
import { ref } from "vue";
import { register } from "@/stores/auth";
import { useRouter } from "vue-router";
import { registerSchema } from "@/schemas/auth";

const router = useRouter();
const email = ref("");
const password = ref("");
const isSubmitting = ref(false);
const confirmPassword = ref("");
const inputError = ref("");

const handleSubmit = async () => {
  const result = registerSchema.safeParse({
    email: email.value,
    password: password.value,
    confirmPassword: confirmPassword.value,
  });

  if (!result.success) {
    inputError.value = result.error.issues[0]?.message || "Invalid input.";
    return;
  }

  isSubmitting.value = true;
  await register(email.value, password.value);
  isSubmitting.value = false;
  router.push("/");
};
</script>

<template>
  <h1>Register</h1>

  <form @submit.prevent="handleSubmit">
    <input placeholder="you@example.com" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
    <input
      type="password"
      placeholder="Confirm Password"
      v-model="confirmPassword"
    />
    <button type="submit" :disabled="isSubmitting">Register</button>
  </form>
  <div>{{ inputError }}</div>
</template>
