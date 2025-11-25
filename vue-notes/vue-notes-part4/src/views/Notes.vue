<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import type { Note as NoteType } from "@/types";
import Note from "@/components/Note.vue";
import noteService from "@/services/notes";
import { useToast } from "vue-toastification";
import { noteSchema } from "@/schemas/note";
import axios from "axios";

const toast = useToast();

const hideImportant = ref(false);
const newNote = ref("");
const notes = ref<NoteType[]>([]);
const filteredNotes = computed(() => {
  return notes.value.filter((note) => !note.important || !hideImportant.value);
});
const isLoading = ref(true);
const inputError = ref("");

// Real-time validation
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
  const result = noteSchema.safeParse(newNote.value);
  if (!result.success) {
    inputError.value =
      result.error.issues[0]?.message || "Invalid note content";
    return;
  }

  // Clear previous error
  inputError.value = "";

  // Submit to API
  try {
    const response = await noteService.createNote(result.data);
    notes.value.push(response);
    newNote.value = "";
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "Failed to create note";
      toast.error(errorMessage);
    } else {
      toast.error("Failed to create note");
    }
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
      const errorMessage =
        error.response?.data?.message || "Failed to update note";
      toast.error(errorMessage);
    } else {
      const errorMessage = "Failed to update note";
      toast.error(errorMessage);
    }
  }
};

const deleteNote = async (noteToDelete: NoteType) => {
  try {
    await noteService.deleteNote(noteToDelete.id);
    notes.value = notes.value.filter((note) => note !== noteToDelete);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "Failed to delete note";
      toast.error(errorMessage);
    } else {
      const errorMessage = "Failed to delete note";
      toast.error(errorMessage);
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
          :class="{ 'input-error': inputError }"
        />
        <div class="error-message">{{ inputError }}</div>
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
