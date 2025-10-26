// ES module import - this is standard JavaScript module syntax
// "vue" is a "bare import" (no ./ or ../ or full path)
// Browsers don't know how to resolve bare imports by default
// Vite intercepts this and rewrites it to point to the actual Vue package
// In dev: Vite serves Vue from node_modules/vue/dist/vue.runtime.esm-bundler.js
// In production: Vite bundles Vue directly into your final JavaScript file
import { createApp } from "vue";

// Import the App component from App.vue
// .vue files are NOT valid JavaScript - browsers can't run them directly
// Vite transforms this .vue file into JavaScript:
//   1. Extracts the <script> section and makes it the component definition
//   2. Compiles the <template> section into a render function
//   3. Processes any <style> section and injects it into the page
// The result is a JavaScript object that Vue understands
import App from "./App.vue";

createApp(App).mount("#app");
