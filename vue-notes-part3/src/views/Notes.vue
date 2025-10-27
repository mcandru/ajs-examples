<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import type { Note as NoteType } from "@/types";
import Note from "@/components/Note.vue";
import { getAllNotes, createNote, removeNote } from "@/services/notes.ts";
import { authStore } from "@/stores/auth.ts";

const hideImportant = ref(false);
const newNote = ref("");
const notes = ref<NoteType[]>([]);
const filteredNotes = computed(() => {
  return notes.value.filter((note) => !note.important || !hideImportant.value);
});

onMounted(async () => {
  await authStore.checkAuth();
  notes.value = await getAllNotes();
});

const addNewNote = async () => {
  const response = await createNote(newNote.value);
  notes.value.push(response);
};

const deleteNote = async (noteToDelete: NoteType) => {
  await removeNote(noteToDelete.id);
  notes.value = notes.value.filter((note) => note !== noteToDelete);
};
</script>

<template>
  <div v-if="authStore.state.isLoggedIn">
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
  </div>
  <div v-else>
    <p>Please log in to view and manage your notes.</p>
  </div>
</template>
