<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { login } from "@/stores/auth";
import { loginSchema } from "@/schemas/auth";
import { z } from "zod";

const router = useRouter();

const email = ref("");
const password = ref("");
const isSubmitting = ref(false);
const inputError = ref("");

const handleSubmit = async () => {
  inputError.value = "";
  try {
    const result = loginSchema.parse({
      email: email.value,
      password: password.value,
    });

    isSubmitting.value = true;
    await login(result.email, result.password);
    isSubmitting.value = false;

    router.push("/");
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      console.log("Zod error:", error.issues);
      inputError.value = error.issues[0]?.message || "Invalid login details.";
      return;
    }
  }
};
</script>

<template>
  <h1>Login</h1>

  <div>
    <form @submit.prevent="handleSubmit">
      <input placeholder="you@example.com" v-model="email" />
      <input type="password" placeholder="Password" v-model="password" />
      <button type="submit" :disabled="isSubmitting">Login</button>
    </form>
    <div class="input-error">{{ inputError }}</div>
  </div>
</template>

<style scoped>
.input-error {
  color: red;
}
</style>
