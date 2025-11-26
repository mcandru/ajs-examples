<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { login } from "@/stores/auth";
import { loginSchema } from "@/schemas/auth";
import axios from "axios";
import { useToast } from "vue-toastification";
import { useForm, Field } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";

const router = useRouter();
const toast = useToast();

const inputError = ref("");

const validationSchema = toTypedSchema(loginSchema);

const { handleSubmit, errors, isSubmitting } = useForm({
  validationSchema,
  initialValues: {
    email: "",
    password: "",
  },
});

const onSubmit = handleSubmit(async (values) => {
  inputError.value = "";

  try {
    await login(values.email, values.password);
    toast.success("Successfully logged in!");
  } catch (error: unknown) {
    if (error instanceof axios.AxiosError) {
      if (error.response && error.response.status === 401) {
        inputError.value = "Invalid email or password.";
      } else if (error.response && error.response.status === 500) {
        toast.error(
          "Had an issue contacting the server. Please contact support if the issue persists"
        );
      } else {
        toast.error("An unexpected error occurred. Please try again later");
      }
    }
  }

  router.push("/");
});
</script>

<template>
  <h1>Login</h1>

  <div>
    <form @submit="onSubmit">
      <div>
        <Field type="email" name="email" placeholder="you@example.com" />
        <span class="input-error">{{ errors.email }}</span>
      </div>
      <div>
        <Field type="password" name="password" placeholder="Password" />
        <span class="input-error">{{ errors.password }}</span>
      </div>
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
