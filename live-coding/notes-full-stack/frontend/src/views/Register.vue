<script setup lang="ts">
import { register } from "@/stores/auth";
import { useRouter } from "vue-router";
import { registerSchema } from "@/schemas/auth";
import { useToast } from "vue-toastification";
import axios from "axios";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import {
  Card,
  CardDescription,
  CardTitle,
  CardFooter,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import FormField from "@/components/FormField.vue";
import { Button } from "@/components/ui/button";

const router = useRouter();
const toast = useToast();

const validationSchema = toTypedSchema(registerSchema);

const { handleSubmit, isSubmitting } = useForm({
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
  <div class="flex items-center justify-center p-4">
    <Card class="w-full max-w-md">
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>Create a new account</CardDescription>
      </CardHeader>
      <form @submit="onSubmit">
        <CardContent>
          <FormField
            name="email"
            label="Email"
            type="email"
            placeholder="you@example.com"
          />
          <FormField
            name="password"
            label="Password"
            type="password"
            placeholder="password"
          />
          <FormField
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="password"
          />
        </CardContent>
        <CardFooter class="flex flex-col gap-2">
          <Button type="submit" class="w-full" :disabled="isSubmitting"
            >Register</Button
          >
          <p class="text-center text-muted-foreground">
            Already have an account?
            <RouterLink to="/login" class="text-primary hover:underline"
              >Login</RouterLink
            >
          </p>
        </CardFooter>
      </form>
    </Card>
  </div>
</template>
