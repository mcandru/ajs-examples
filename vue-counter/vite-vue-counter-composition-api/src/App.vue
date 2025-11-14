<script setup>
import { ref } from "vue";

const count = ref(0);

const incrementCounter = () => {
  count.value++;
};
</script>

<template>
  <h1>Vite Vue Counter</h1>
  <div id="count">{{ count }}</div>
  <button @click="incrementCounter">Increment</button>
</template>
