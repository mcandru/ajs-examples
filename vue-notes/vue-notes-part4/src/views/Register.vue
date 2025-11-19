<script setup lang="ts">
import { ref } from "vue";
import { register } from "@/stores/auth";
import { useRouter } from "vue-router";
import { registerSchema } from "@/schemas/auth";
import { useToast } from "vue-toastification";

const router = useRouter();
const toast = useToast();

const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const inputError = ref<string | null>(null);
const isSubmitting = ref(false);

const handleSubmit = async () => {
  isSubmitting.value = true;

  const validatedData = registerSchema.safeParse({
    email: email.value,
    password: password.value,
    confirmPassword: confirmPassword.value,
  });

  if (!validatedData.success) {
    inputError.value =
      validatedData.error.issues[0]?.message || "Invalid input.";
    isSubmitting.value = false;
    return;
  }

  inputError.value = null;

  try {
    await register(email.value, password.value);
    toast.success("Account created successfully!");
    router.push("/");
  } catch (error: any) {
    toast.error(
      error.response?.data?.message ||
        "Failed to create account. Please try again."
    );
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
    <div v-if="inputError" class="error-message">{{ inputError }}</div>
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
