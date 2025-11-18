<script setup lang="ts">
const props = defineProps<{ id: string }>();
</script>

<template>
  <p>{{ props.id }}</p>
</template>
