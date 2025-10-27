<script setup lang="ts">
import { useRouter } from "vue-router";
import { getProfile } from "@/services/auth.ts";
import { ref, onMounted } from "vue";
import type { User } from "@/types/index.ts";

const profile = ref<User | null>(null);

onMounted(async () => {
  const profileData = await getProfile();
  if (profileData.user) {
    profile.value = profileData.user;
  }
});

const router = useRouter();

const logout = async () => {
  await fetch("/api/auth/logout", {
    method: "POST",
  });

  router.push("/");
};
</script>

<template>
  <div v-if="profile">
    <h1>{{ profile.email }}'s Profile</h1>
    <p><strong>Email:</strong> {{ profile.email }}</p>
    <button @click="logout">Logout</button>
  </div>
  <div v-else>
    <p>Not logged in</p>
  </div>
</template>
