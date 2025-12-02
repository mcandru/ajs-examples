<script setup lang="ts">
import { ref } from 'vue';

const count = ref(0);

const increment = () => {
  count.value++;
};

const decrement = () => {
  count.value--;
};

const reset = () => {
  count.value = 0;
};
</script>

<template>
  <div class="counter">
    <h2>Counter</h2>
    <p data-testid="count-display">Count: {{ count }}</p>
    <div class="buttons">
      <button data-testid="increment-button" @click="increment">+</button>
      <button data-testid="decrement-button" @click="decrement">-</button>
      <button data-testid="reset-button" @click="reset">Reset</button>
    </div>
  </div>
</template>

<style scoped>
.counter {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  max-width: 300px;
}

.buttons {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

button {
  padding: 8px 16px;
  cursor: pointer;
  border: 1px solid #333;
  border-radius: 4px;
  background: white;
}

button:hover {
  background: #f0f0f0;
}
</style>
