<script setup lang="ts">
import { RouterView } from "vue-router";
import { isLoggedIn, isLoading } from "@/stores/auth";
import { StickyNote } from "lucide-vue-next";
import NavButton from "@/components/NavButton.vue";
</script>

<template>
  <header class="border-b">
    <div class="container flex items-center justify-between h-16 px-4 m-auto">
      <div class="flex items-center gap-2">
        <StickyNote />
        <h1 class="text-2xl font-bold">Notes</h1>
      </div>
      <nav v-if="!isLoading">
        <NavButton v-if="isLoggedIn" to="/">Notes</NavButton>
        <NavButton v-if="!isLoggedIn" to="/login">Login</NavButton>
        <NavButton v-if="!isLoggedIn" to="/register">Register</NavButton>
        <NavButton
          v-if="isLoggedIn"
          to="/profile"
          data-testid="nav-profile-link"
          >Profile</NavButton
        >
      </nav>
    </div>
  </header>
  <main class="py-6">
    <RouterView />
  </main>
</template>
