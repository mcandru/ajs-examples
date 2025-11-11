<script setup lang="ts">
import { ref, computed } from "vue";
import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import type { Component } from "vue";

const routes: Record<string, Component> = {
  "/": Home,
  "/about": About,
};

// Reactive reference to the current path based on the window location pathname
// This allows the app to respond to changes in the URL path
// https://developer.mozilla.org/en-US/docs/Web/API/History_API
const currentPath = ref(window.location.pathname);

// Listen for popstate events (back/forward navigation) to update the current path
window.addEventListener("popstate", () => {
  currentPath.value = window.location.pathname;
  console.log("Window location pathname:", window.location.pathname);
});

// Function to navigate to a new path using the History API
const navigate = (path: string) => {
  history.pushState({}, "", path);
  currentPath.value = path;
  console.log("Navigated to:", path);
};

// Computed property to determine the current view component based on the current path
const currentView = computed(() => {
  return routes[currentPath.value] || Home;
});
</script>

<template>
  <!-- Simple navigation links to switch between views -->
  <!-- These links use the History API to navigate without page reload -->
  <a href="/" @click.prevent="navigate('/')">Home</a>
  <a href="/about" @click.prevent="navigate('/about')">About</a>
  <!-- This uses Dynamic Components in Vue, which allow you to reactively switch between components -->
  <component :is="currentView" />
</template>
