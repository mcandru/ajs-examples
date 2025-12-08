<script setup lang="ts">
import { useRouter } from "vue-router";
import { isLoggedIn, user, isLoading, logout } from "@/stores/auth";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useToast } from "vue-toastification";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const router = useRouter();
const toast = useToast();

const handleLogout = async () => {
  try {
    await logout();
    toast.success("Successfully logged out!");
    router.push("/login");
  } catch (error: unknown) {
    toast.error("An error occurred while logging out. Please try again.");
  }
};
</script>

<template>
  <div class="container m-auto max-w-2xl p-4">
    <div v-if="isLoggedIn && user">
      <Card>
        <CardHeader>
          <CardTitle class="text-2xl">Profile</CardTitle>
          <CardDescription>Manage your account settings</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <div>
            <p class="text-muted-foreground">Email</p>
            <p>{{ user.email }}</p>
          </div>
          <Button
            variant="destructive"
            @click="handleLogout"
            data-testid="logout-button"
            >Logout</Button
          >
        </CardContent>
      </Card>
    </div>
    <div v-else-if="isLoading">
      <p><Spinner /></p>
    </div>
    <div v-else>
      <p>Not logged in</p>
    </div>
  </div>
</template>
