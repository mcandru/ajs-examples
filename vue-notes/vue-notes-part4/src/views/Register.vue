<script setup lang="ts">
import { ref } from "vue";
import { register } from "@/stores/auth";
import { useRouter } from "vue-router";
import { registerSchema } from "@/schemas/auth";
import { useToast } from "vue-toastification";
import { ZodError } from "zod";

const router = useRouter();
const toast = useToast();

const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const isSubmitting = ref(false);
const errors = ref<{ email?: string; password?: string; confirmPassword?: string }>({});

const handleSubmit = async () => {
  // Clear previous errors
  errors.value = {};

  // Validate input with Zod
  try {
    registerSchema.parse({
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      error.errors.forEach((err) => {
        const field = err.path[0] as "email" | "password" | "confirmPassword";
        errors.value[field] = err.message;
      });
      return;
    }
  }

  // Submit to API
  isSubmitting.value = true;
  try {
    await register(email.value, password.value);
    toast.success("Account created successfully! Welcome!");
    router.push("/");
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Failed to create account. Please try again.");
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <h1>Register</h1>

  <form @submit.prevent="handleSubmit">
    <div>
      <input type="email" placeholder="you@example.com" v-model="email" />
      <span v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</span>
    </div>
    <div>
      <input type="password" placeholder="Password" v-model="password" />
      <span v-if="errors.password" class="text-red-500 text-sm">{{ errors.password }}</span>
    </div>
    <div>
      <input type="password" placeholder="Confirm Password" v-model="confirmPassword" />
      <span v-if="errors.confirmPassword" class="text-red-500 text-sm">{{ errors.confirmPassword }}</span>
    </div>
    <button type="submit" :disabled="isSubmitting">Register</button>
  </form>
</template>
