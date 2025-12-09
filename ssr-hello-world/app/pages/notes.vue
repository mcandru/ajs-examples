<script setup>
const { data: notes, error, status } = await useFetch("/api/notes");
</script>

<template>
  <h1>Notes</h1>
  <ul>
    <li v-for="note in notes">{{ note.content }}</li>
  </ul>
</template>
