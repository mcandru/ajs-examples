<script setup lang="ts">
import type { Note } from "@/types/index.ts";
import { RouterLink } from "vue-router";
defineProps<{
  note: Note;
}>();

const emit = defineEmits<{
  delete: [note: Note];
  "toggle-important": [];
}>();
</script>

<template>
  <li>
    <RouterLink :to="`notes/${note.id}`">{{ note.content }}</RouterLink>
    <button @click="emit('delete', note)">X</button>
    <button class="action-button" @click="emit('toggle-important')">
      {{ note.important ? "Make Normal" : "Make Important" }}
    </button>
  </li>
</template>
