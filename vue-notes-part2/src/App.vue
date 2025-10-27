<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import type { Note as NoteType } from "@/types";
import Note from "./components/Note.vue";

let id = 0;

const hideImportant = ref(false);
const newNote = ref("");
const notes = ref<NoteType[]>([]);
const filteredNotes = computed(() => {
  return notes.value.filter((note) => !note.important || !hideImportant.value);
});

onMounted(async () => {
  const response = await fetch(
    "https://ajs-notes-json-server.vercel.app/notes"
  );
  const data = await response.json();
  notes.value = data;
});

const addNewNote = () => {
  notes.value.push({
    id: String(id++),
    content: newNote.value,
    important: false,
  });
};

const deleteNote = (noteToDelete: NoteType) => {
  notes.value = notes.value.filter((note) => note !== noteToDelete);
};
</script>

<template>
  <h1>Notes</h1>
  <form @submit.prevent="addNewNote">
    <input type="text" v-model="newNote" />
    <button type="submit">Submit</button>
  </form>

  <ul>
    <Note
      v-for="note in filteredNotes"
      :key="note.id"
      :note="note"
      @delete="deleteNote"
      @toggle-important="note.important = !note.important"
    />
  </ul>
  <button @click="hideImportant = !hideImportant">
    {{ hideImportant ? "Show All" : "Hide Important" }}
  </button>
</template>

<style scoped>
.action-button {
  margin: 5px;
}
</style>
