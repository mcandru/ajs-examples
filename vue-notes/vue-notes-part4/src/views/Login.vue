<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { login, isLoggedIn, isLoading } from "@/stores/auth";
import { loginSchema } from "@/schemas/auth";
import { useToast } from "vue-toastification";
import axios from "axios";

const router = useRouter();
const toast = useToast();

const email = ref("");
const password = ref("");
const isSubmitting = ref(false);
const inputError = ref<string | null>(null);

const handleSubmit = async () => {
  // Clear previous errors
  inputError.value = null;

  const loginData = loginSchema.safeParse({
    email: email.value,
    password: password.value,
  });

  if (!loginData.success) {
    inputError.value =
      loginData.error.issues[0]?.message || "Invalid login details.";
    return;
  }

  // Submit to API
  isSubmitting.value = true;
  try {
    await login(email.value, password.value);
    toast.success("Successfully logged in!");
    router.push("/");
  } catch (error: unknown) {
    if (error instanceof axios.AxiosError) {
      if (error.response && error.response.status === 401) {
        inputError.value = "Invalid email or password.";
      } else if (error.response && error.response.status === 500) {
        toast.error(
          "Had an issue contacting the server. Please contact support if the issue persists."
        );
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
    }
  } finally {
    isSubmitting.value = false;
  }
};
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
      <div>
        <input type="email" placeholder="you@example.com" v-model="email" />
      </div>
      <div>
        <input type="password" placeholder="Password" v-model="password" />
      </div>
      <button type="submit" :disabled="isSubmitting">Login</button>
    </form>
    <div v-if="inputError" class="error-message">{{ inputError }}</div>
  </div>
</template>

<style scoped>
.error-message {
  color: #e74c3c;
  margin-top: 0.25rem;
  font-size: 0.875rem;
  min-height: 1.25rem;
}
</style>
