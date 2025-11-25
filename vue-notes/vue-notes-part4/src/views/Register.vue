<script setup lang="ts">
import { ref } from "vue";
import { register } from "@/stores/auth";
import { useRouter } from "vue-router";
import { registerSchema } from "@/schemas/auth";
import { useToast } from "vue-toastification";
import axios from "axios";

const router = useRouter();
const toast = useToast();

const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const inputError = ref("");
const isSubmitting = ref(false);

const handleSubmit = async () => {
  isSubmitting.value = true;

  const result = registerSchema.safeParse({
    email: email.value,
    password: password.value,
    confirmPassword: confirmPassword.value,
  });

  if (!result.success) {
    inputError.value = result.error.issues[0]?.message || "Invalid input.";
    isSubmitting.value = false;
    return;
  }

  inputError.value = "";

  try {
    await register(result.data.email, result.data.password);
    toast.success("Account created successfully!");
    router.push("/");
  } catch (error: unknown) {
    if (error instanceof axios.AxiosError && error.response) {
      toast.error(
        error.response.data?.message ||
          "Failed to create account. Please try again."
      );
    } else {
      toast.error("An unexpected error occurred. Please try again later.");
    }
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
    </div>
    <div>
      <input type="password" placeholder="Password" v-model="password" />
    </div>
    <div>
      <input
        type="password"
        placeholder="Confirm Password"
        v-model="confirmPassword"
      />
    </div>
    <button type="submit" :disabled="isSubmitting">Register</button>
    <div class="error-message">{{ inputError }}</div>
  </form>
</template>

<style scoped>
.error-message {
  color: #e74c3c;
  margin-top: 0.25rem;
  font-size: 0.875rem;
  min-height: 1.25rem;
}
</style>
