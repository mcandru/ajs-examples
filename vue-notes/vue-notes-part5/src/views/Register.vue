<script setup lang="ts">
import { register } from "@/stores/auth";
import { useRouter } from "vue-router";
import { registerSchema } from "@/schemas/auth";
import { useToast } from "vue-toastification";
import axios from "axios";
import { useForm, Field } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";

const router = useRouter();
const toast = useToast();

const validationSchema = toTypedSchema(registerSchema);

const { handleSubmit, isSubmitting, errors } = useForm({
  validationSchema,
  initialValues: {
    email: "",
    password: "",
    confirmPassword: "",
  },
});

const onSubmit = handleSubmit(async (values) => {
  try {
    await register(values.email, values.password);
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
  }
});
</script>

<template>
  <h1>Register</h1>

  <form @submit="onSubmit">
    <div>
      <Field name="email" type="email" placeholder="you@example.com" />
      <span class="error-message">{{ errors.email }}</span>
    </div>
    <div>
      <Field name="password" type="password" placeholder="Password" />
      <span class="error-message">{{ errors.password }}</span>
    </div>
    <div>
      <Field
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password"
      />
      <span class="error-message">{{ errors.confirmPassword }}</span>
    </div>
    <button type="submit" :disabled="isSubmitting">Register</button>
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
