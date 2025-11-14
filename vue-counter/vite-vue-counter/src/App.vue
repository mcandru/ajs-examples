<script>
export default {
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    incrementCounter() {
      this.count++;
    },
  },
};
</script>

<template>
  <h1>Vite Vue Counter</h1>
  <div id="count">{{ count }}</div>
  <button @click="incrementCounter">Increment</button>
</template>
