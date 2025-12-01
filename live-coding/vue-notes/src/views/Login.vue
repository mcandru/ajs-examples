<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { login, isLoggedIn } from "@/stores/auth";
import { loginSchema } from "@/schemas/auth";
import { useToast } from "vue-toastification";
import axios from "axios";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import FormField from "@/components/FormField.vue";
import { Button } from "@/components/ui/button";

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
  <div class="flex items-center justify-center p-4">
    <Card class="w-full max-wd-md">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Welcome back!</CardDescription>
      </CardHeader>
      <CardContent v-if="isLoggedIn">
        <p>You are logged in!</p>
      </CardContent>
      <div v-else>
        <form @submit="onSubmit">
          <CardContent>
            <FormField
              name="email"
              type="email"
              label="Email"
              placeholder="you@example.com"
            />
            <FormField
              name="password"
              type="password"
              label="Password"
              placeholder="password"
            />
            <div v-if="inputError" class="error-message">{{ inputError }}</div>
          </CardContent>
          <CardFooter class="flex flex-col gap-2">
            <Button type="submit" class="w-full" :disabled="isSubmitting"
              >Login</Button
            >
            <p class="text-center text-muted-foreground">
              Don't have an account?
              <RouterLink to="/register" class="text-primary hover:underline"
                >Register</RouterLink
              >
            </p>
          </CardFooter>
        </form>
      </div>
    </Card>
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
