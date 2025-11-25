<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import type { Note as NoteType } from "@/types";
import Note from "@/components/Note.vue";
import noteService from "@/services/notes.ts";
import { noteSchema } from "@/schemas/notes";

const hideImportant = ref(false);
const newNote = ref("");
const notes = ref<NoteType[]>([]);
const filteredNotes = computed(() => {
  return notes.value.filter((note) => !note.important || !hideImportant.value);
});
const isLoading = ref(true);
const inputError = ref("");

onMounted(async () => {
  notes.value = await noteService.getAllNotes();
  isLoading.value = false;
});

watch(newNote, (value) => {
  if (value.trim() === "") {
    inputError.value = "";
    return;
  }

  const result = noteSchema.safeParse(value);

  if (!result.success) {
    inputError.value =
      result.error.issues[0]?.message || "Invalid note content";
  } else {
    inputError.value = "";
  }
});

const addNewNote = async () => {
  if (newNote.value.trim() === "") return;

  const response = await noteService.createNote(newNote.value);
  notes.value.push(response);
  newNote.value = "";
};

const toggleImportant = async (note: NoteType) => {
  const result = await noteService.updateNote(
    note.id,
    note.content,
    !note.important
  );
  note.important = result.important;
};

const deleteNote = async (noteToDelete: NoteType) => {
  await noteService.deleteNote(noteToDelete.id);
  notes.value = notes.value.filter((note) => note !== noteToDelete);
};
</script>

<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else>
    <form @submit.prevent="addNewNote">
      <input type="text" v-model="newNote" />
      <button type="submit">Submit</button>
    </form>
    <div>{{ inputError }}</div>

    <button @click="hideImportant = !hideImportant">
      {{ hideImportant ? "Show All" : "Hide Important" }}
    </button>

    <ul>
      <Note
        v-for="note in filteredNotes"
        :key="note.id"
        :note="note"
        @delete="deleteNote"
        @toggle-important="toggleImportant(note)"
      />
    </ul>
  </div>
</template>
