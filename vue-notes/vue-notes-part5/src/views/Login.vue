<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { login, isLoggedIn } from "@/stores/auth";
import { loginSchema } from "@/schemas/auth";
import { useToast } from "vue-toastification";
import axios from "axios";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { Button } from "@/components/ui/button";
import FormField from "@/components/FormField.vue";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

const router = useRouter();
const toast = useToast();

const inputError = ref("");

const validationSchema = toTypedSchema(loginSchema);

const { handleSubmit, isSubmitting, errors } = useForm({
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
    <Card class="w-full max-w-md">
      <CardHeader>
        <CardTitle class="text-2xl">Login</CardTitle>
        <CardDescription>Welcome back!</CardDescription>
      </CardHeader>
      <CardContent v-if="isLoggedIn">
        <p class="text-center text-muted-foreground">
          You are already logged in!
        </p>
      </CardContent>
      <form v-else @submit="onSubmit">
        <CardContent>
          <FormField
            name="email"
            label="Email"
            type="email"
            placeholder="you@example.com"
            :error="errors.email"
          />
          <FormField
            name="password"
            label="Password"
            type="password"
            placeholder="password"
            :error="errors.password"
          />
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
        <div v-if="inputError" class="error-message">{{ inputError }}</div>
      </form>
    </Card>
  </div>
</template>
