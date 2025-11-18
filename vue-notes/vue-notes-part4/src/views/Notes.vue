<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import type { Note as NoteType } from "@/types";
import Note from "@/components/Note.vue";
import noteService from "@/services/notes.ts";
import { noteSchema } from "@/schemas/note";
import { useToast } from "vue-toastification";
import { ZodError } from "zod";

const toast = useToast();

const hideImportant = ref(false);
const newNote = ref("");
const notes = ref<NoteType[]>([]);
const filteredNotes = computed(() => {
  return notes.value.filter((note) => !note.important || !hideImportant.value);
});
const isLoading = ref(true);
const noteError = ref<string>("");

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

  // Validate input with Zod
  try {
    noteSchema.parse({ content: newNote.value });
  } catch (error) {
    if (error instanceof ZodError) {
      noteError.value = error.errors[0].message;
      return;
    }
  }

  // Submit to API
  try {
    const response = await noteService.createNote(newNote.value);
    notes.value.push(response);
    newNote.value = "";
    toast.success("Note created successfully!");
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
    toast.success(`Note marked as ${result.important ? "important" : "not important"}`);
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Failed to update note");
  }
};

const deleteNote = async (noteToDelete: NoteType) => {
  try {
    await noteService.deleteNote(noteToDelete.id);
    notes.value = notes.value.filter((note) => note !== noteToDelete);
    toast.success("Note deleted successfully!");
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Failed to delete note");
  }
};
</script>

<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else>
    <form @submit.prevent="addNewNote">
      <div>
        <input type="text" v-model="newNote" placeholder="Enter a new note" />
        <span v-if="noteError" class="text-red-500 text-sm">{{ noteError }}</span>
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
