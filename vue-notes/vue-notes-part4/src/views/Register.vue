<script setup lang="ts">
import { ref } from "vue";
import { register } from "@/stores/auth";
import { useRouter } from "vue-router";
import { emailSchema, passwordSchema } from "@/schemas/auth";
import { useToast } from "vue-toastification";
import { z } from "zod";

const router = useRouter();
const toast = useToast();

const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const isSubmitting = ref(false);

// Individual error states for each field
const emailError = ref<string>("");
const passwordError = ref<string>("");
const confirmPasswordError = ref<string>("");

// Track if field has been touched (blurred at least once)
const emailTouched = ref(false);
const passwordTouched = ref(false);
const confirmPasswordTouched = ref(false);

// Validate individual fields using exported schemas
const validateEmail = () => {
  try {
    emailSchema.parse(email.value);
    emailError.value = "";
    return true;
  } catch (error) {
    if (error instanceof z.ZodError) {
      emailError.value = error.issues[0]?.message || "Invalid email";
    }
    return false;
  }
};

const validatePassword = () => {
  try {
    passwordSchema.parse(password.value);
    passwordError.value = "";
    return true;
  } catch (error) {
    if (error instanceof z.ZodError) {
      passwordError.value = error.issues[0]?.message || "Invalid password";
    }
    return false;
  }
};

const validateConfirmPassword = () => {
  if (!confirmPassword.value) {
    confirmPasswordError.value = "Please confirm your password";
    return false;
  }
  if (password.value !== confirmPassword.value) {
    confirmPasswordError.value = "Passwords don't match";
    return false;
  }
  confirmPasswordError.value = "";
  return true;
};

// Handle blur events (when user leaves field)
const handleEmailBlur = () => {
  emailTouched.value = true;
  validateEmail();
};

const handlePasswordBlur = () => {
  passwordTouched.value = true;
  validatePassword();
  // Also revalidate confirm password if it's been touched
  if (confirmPasswordTouched.value) {
    validateConfirmPassword();
  }
};

const handleConfirmPasswordBlur = () => {
  confirmPasswordTouched.value = true;
  validateConfirmPassword();
};

// Live validation on input (only after field has been touched)
const handleEmailInput = () => {
  if (emailTouched.value) {
    validateEmail();
  }
};

const handlePasswordInput = () => {
  if (passwordTouched.value) {
    validatePassword();
  }
  // Also revalidate confirm password if it's been touched
  if (confirmPasswordTouched.value) {
    validateConfirmPassword();
  }
};

const handleConfirmPasswordInput = () => {
  if (confirmPasswordTouched.value) {
    validateConfirmPassword();
  }
};

const handleSubmit = async () => {
  // Mark all fields as touched
  emailTouched.value = true;
  passwordTouched.value = true;
  confirmPasswordTouched.value = true;

  // Validate all fields
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();
  const isConfirmPasswordValid = validateConfirmPassword();

  if (!isEmailValid || !isPasswordValid || !isConfirmPasswordValid) {
    return;
  }

  // Submit to API
  isSubmitting.value = true;
  try {
    await register(email.value, password.value);
    toast.success("Account created successfully! Welcome!");
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
      <input
        type="email"
        placeholder="you@example.com"
        v-model="email"
        @blur="handleEmailBlur"
        @input="handleEmailInput"
        :class="{ 'input-error': emailError }"
      />
      <div v-if="emailError" class="error-message">{{ emailError }}</div>
    </div>
    <div>
      <input
        type="password"
        placeholder="Password"
        v-model="password"
        @blur="handlePasswordBlur"
        @input="handlePasswordInput"
        :class="{ 'input-error': passwordError }"
      />
      <div v-if="passwordError" class="error-message">{{ passwordError }}</div>
    </div>
    <div>
      <input
        type="password"
        placeholder="Confirm Password"
        v-model="confirmPassword"
        @blur="handleConfirmPasswordBlur"
        @input="handleConfirmPasswordInput"
        :class="{ 'input-error': confirmPasswordError }"
      />
      <div v-if="confirmPasswordError" class="error-message">
        {{ confirmPasswordError }}
      </div>
    </div>
    <button type="submit" :disabled="isSubmitting">Register</button>
  </form>
</template>

<style scoped>
form > div {
  margin-bottom: 1rem;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 2px solid #ddd;
  border-radius: 4px;
  transition: border-color 0.2s;
}

input:focus {
  outline: none;
  border-color: #4a90e2;
}

.input-error {
  border-color: #e74c3c !important;
}

.input-error:focus {
  border-color: #e74c3c !important;
  box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1);
}

.error-message {
  color: #e74c3c;
  margin-top: 0.25rem;
  font-size: 0.875rem;
  min-height: 1.25rem;
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;
}

button:hover:not(:disabled) {
  background-color: #357abd;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
