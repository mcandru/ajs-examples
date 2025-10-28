<script setup lang="ts">
import { ref, computed } from "vue";
import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import type { Component } from "vue";

const routes: Record<string, Component> = {
  "/": Home,
  "/about": About,
};

// Reactive reference to the current path based on the window location hash
// This allows the app to respond to changes in the URL hash
// https://developer.mozilla.org/en-US/docs/Web/API/Location
const currentPath = ref(window.location.hash);

// Listen for hash changes in the URL to update the current path
window.addEventListener("hashchange", () => {
  currentPath.value = window.location.hash;
  console.log("Window location hash:", window.location.hash);
});

// Computed property to determine the current view component based on the current path
// It slices off the '#' character and looks up the corresponding component in the routes object
const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || "/"] || Home;
});
</script>

<template>
  <!-- Simple navigation links to switch between views -->
  <!-- These links update the window location hash, which triggers the hashchange event -->
  <a href="#/">Home</a>
  <a href="#/about">About</a>
  <!-- This uses Dynamic Components in Vue, which allow you to reactively switch between components -->
  <component :is="currentView" />
</template>

<style scoped></style>
