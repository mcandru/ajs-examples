<script setup lang="ts">
import { register } from "@/stores/auth";
import { useRouter } from "vue-router";
import { registerSchema } from "@/schemas/auth";
import { useToast } from "vue-toastification";
import axios from "axios";

const toast = useToast();
const router = useRouter();
import { useForm, Field } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";

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
  } catch (error: unknown) {
    if (error instanceof axios.AxiosError && error.response) {
      toast.error(error.response.data?.message || "Failed to create account.");
    }
    toast.error("An unexpected error occurred!");
  }
  router.push("/");
});
</script>

<template>
  <h1>Register</h1>

  <form @submit="onSubmit">
    <div>
      <Field name="email" placeholder="you@example.com" />
      <span>{{ errors.email }}</span>
    </div>
    <div>
      <Field name="password" type="password" placeholder="Password" />
      <span>{{ errors.password }}</span>
    </div>
    <div>
      <Field
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        v-model="confirmPassword"
      />
      <span>{{ errors.confirmPassword }}</span>
    </div>
    <button type="submit" :disabled="isSubmitting">Register</button>
  </form>
  <div>{{ inputError }}</div>
</template>
