<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import type { Note as NoteType } from "@/types";
import Note from "@/components/Note.vue";
import noteService from "@/services/notes.ts";
import { useToast } from "vue-toastification";
import { noteSchema } from "@/schemas/note.ts";
import axios from "axios";

const toast = useToast();

const hideImportant = ref(false);
const newNote = ref("");
const notes = ref<NoteType[]>([]);
const filteredNotes = computed(() => {
  return notes.value.filter((note) => !note.important || !hideImportant.value);
});
const isLoading = ref(true);
const noteError = ref<string>("");

// Real-time validation
watch(newNote, (value) => {
  if (value.trim() === "") {
    noteError.value = "";
    return;
  }

  const result = noteSchema.safeParse(value);
  if (!result.success) {
    noteError.value = result.error.issues[0]?.message || "Invalid note content";
  } else {
    noteError.value = "";
  }
});

onMounted(async () => {
  try {
    notes.value = await noteService.getAllNotes();
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Failed to load notes");
  } finally {
    isLoading.value = false;
  }
});

const addNewNote = async () => {
  // Clear previous error
  noteError.value = "";

  const result = noteSchema.safeParse(newNote.value);
  if (!result.success) {
    noteError.value = result.error.issues[0]?.message || "Invalid note content";
    return;
  }

  // Submit to API
  try {
    const response = await noteService.createNote(newNote.value);
    notes.value.push(response);
    newNote.value = "";
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Failed to create note");
  }
};

const toggleImportant = async (note: NoteType) => {
  try {
    const result = await noteService.updateNote(
      note.id,
      note.content,
      !note.important
    );
    note.important = result.important;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data?.message || "Failed to update note");
    } else {
      toast.error("Failed to update note");
    }
  }
};

const deleteNote = async (noteToDelete: NoteType) => {
  try {
    await noteService.deleteNote(noteToDelete.id);
    notes.value = notes.value.filter((note) => note !== noteToDelete);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data?.message || "Failed to delete note");
    } else {
      toast.error("Failed to delete note");
    }
  }
};
</script>

<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else>
    <form @submit.prevent="addNewNote">
      <div>
        <input
          type="text"
          v-model="newNote"
          placeholder="Enter a new note"
          :class="{ 'input-error': noteError }"
        />
        <div v-if="noteError" class="error-message">{{ noteError }}</div>
      </div>
      <button type="submit">Submit</button>
    </form>

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

<style scoped>
.error-message {
  color: red;
  margin-top: 4px;
  margin-bottom: 8px;
  font-size: 0.8em;
}

.input-error {
  border-color: red;
  outline-color: red;
}

.input-error:focus {
  outline-color: red;
}
</style>
