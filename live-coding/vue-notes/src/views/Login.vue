<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { login } from "@/stores/auth";
import { loginSchema } from "@/schemas/auth";
import axios from "axios";

const router = useRouter();

const email = ref("");
const password = ref("");
const isSubmitting = ref(false);
const inputError = ref("");

const handleSubmit = async () => {
  inputError.value = "";

  const result = loginSchema.safeParse({
    email: email.value,
    password: password.value,
  });

  if (!result.success) {
    inputError.value =
      result.error.issues[0]?.message || "Invalid login details.";
    return;
  }

  try {
    isSubmitting.value = true;
    await login(result.data.email, result.data.password);
  } catch (error: unknown) {
    if (error instanceof axios.AxiosError) {
      if (error.response && error.response.status === 401) {
        inputError.value = "Invalid email or password.";
      }
    }
  } finally {
    isSubmitting.value = false;
  }

  router.push("/");
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
