<script setup lang="ts">
import Counter from './components/Counter.vue';
import TodoList from './components/TodoList.vue';
</script>

<template>
  <div id="app">
    <h1>Vue Testing Practice</h1>
    <div class="components">
      <Counter />
      <TodoList />
    </div>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, sans-serif;
  padding: 20px;
  background: #f5f5f5;
}

#app {
  max-width: 1000px;
  margin: 0 auto;
}

h1 {
  margin-bottom: 30px;
  color: #333;
}

.components {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}
</style>
