<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { login, isLoggedIn } from "@/stores/auth";
import { loginSchema } from "@/schemas/auth";
import { useToast } from "vue-toastification";
import axios from "axios";
import { useForm, Field } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";

const router = useRouter();
const toast = useToast();

const inputError = ref("");

const validationSchema = toTypedSchema(loginSchema);

const { handleSubmit, isSubmitting, values, errors } = useForm({
  validationSchema,
  initialValues: {
    email: "",
    password: "",
  },
});

const onSubmit = handleSubmit(async (values) => {
  try {
    await login(values.email, values.password);
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
  }
});
</script>

<template>
  <h1>Login</h1>

  <div v-if="isLoggedIn">
    <p>You are logged in!</p>
  </div>
  <div v-else>
    <form @submit="onSubmit">
      <div>
        <Field name="email" type="email" placeholder="you@example.com" />
        <span class="error-message">{{ errors.email }}</span>
      </div>
      <div>
        <Field name="password" type="password" placeholder="Password" />
        <span class="error-message">{{ errors.password }}</span>
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
