<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import Note from "@/components/Note.vue";
import type { Note as NoteType } from "@/types";

let id = 0;

const showNotes = ref(true);
const newNote = ref("");
const hideImportant = ref(false);
const notes = ref<NoteType[]>([]);
const isLoading = ref(true);

const filteredNotes = computed(() => {
  return notes.value.filter((note) => !note.important || !hideImportant.value);
});

const toggleNotes = () => {
  showNotes.value = !showNotes.value;
};

const addNewNote = () => {
  notes.value.push({
    id: id++,
    content: newNote.value,
    important: false,
  });
  newNote.value = "";
};

const deleteNote = (noteToDelete: NoteType): void => {
  notes.value = notes.value.filter((note) => note !== noteToDelete);
};

onMounted(async () => {
  const response = await fetch("/api/notes");
  const data = await response.json();
  notes.value = data;
  isLoading.value = false;
});
</script>

<template>
  <!-- Directives -->
  <div v-if="!isLoading">
    <div v-if="notes && notes.length > 0">
      Number of notes: {{ notes.length }}
    </div>
    <div v-else>No notes yet!</div>

    <form @submit.prevent="addNewNote">
      <input type="text" v-model="newNote" />
      <button type="submit">Submit</button>
    </form>

    <button @click="toggleNotes">Show/Hide Notes</button>

    <button @click="hideImportant = !hideImportant">
      {{ hideImportant ? "Show All" : "Hide Important" }}
    </button>

    <div v-if="showNotes">
      <ul>
        <Note
          v-for="note in filteredNotes"
          :key="note.id"
          :note="note"
          @delete="deleteNote"
          @toggle-important="note.important = !note.important"
        />
      </ul>
    </div>
  </div>
  <div v-else>Loading..</div>
</template>

<style scoped></style>
