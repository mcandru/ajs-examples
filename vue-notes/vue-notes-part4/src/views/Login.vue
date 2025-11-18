<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { login, isLoggedIn, isLoading } from "@/stores/auth";
import { loginSchema } from "@/schemas/auth";
import { useToast } from "vue-toastification";
import { ZodError } from "zod";

const router = useRouter();
const toast = useToast();

const email = ref("");
const password = ref("");
const isSubmitting = ref(false);
const errors = ref<{ email?: string; password?: string }>({});

const handleSubmit = async () => {
  // Clear previous errors
  errors.value = {};

  // Validate input with Zod
  try {
    loginSchema.parse({ email: email.value, password: password.value });
  } catch (error) {
    if (error instanceof ZodError) {
      error.errors.forEach((err) => {
        const field = err.path[0] as "email" | "password";
        errors.value[field] = err.message;
      });
      return;
    }
  }

  // Submit to API
  isSubmitting.value = true;
  try {
    await login(email.value, password.value);
    toast.success("Successfully logged in!");
    router.push("/");
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Failed to login. Please check your credentials.");
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
        <span v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</span>
      </div>
      <div>
        <input type="password" placeholder="Password" v-model="password" />
        <span v-if="errors.password" class="text-red-500 text-sm">{{ errors.password }}</span>
      </div>
      <button type="submit" :disabled="isSubmitting">Login</button>
    </form>
  </div>
</template>
