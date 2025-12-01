<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import type { Note as NoteType } from "@/types";
import Note from "@/components/Note.vue";
import noteService from "@/services/notes";
import { useToast } from "vue-toastification";
import { noteSchema } from "@/schemas/note";
import axios from "axios";
import { useForm, Field } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const toast = useToast();

const hideImportant = ref(false);
const notes = ref<NoteType[]>([]);
const filteredNotes = computed(() => {
  return notes.value.filter((note) => !note.important || !hideImportant.value);
});
const isLoading = ref(true);

const validationSchema = toTypedSchema(noteSchema);

const { handleSubmit, isSubmitting, errors, resetForm } = useForm({
  initialValues: {
    newNote: "",
  },
});

onMounted(async () => {
  try {
    notes.value = await noteService.getAllNotes();
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "Failed to load notes";
      toast.error(errorMessage);
    } else {
      toast.error("Failed to load notes");
    }
  } finally {
    isLoading.value = false;
  }
});

const addNewNote = handleSubmit(async (values) => {
  try {
    const response = await noteService.createNote(values.newNote);
    notes.value.push(response);
    resetForm();
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "Failed to create note";
      toast.error(errorMessage);
    } else {
      toast.error("Failed to create note");
    }
  }
});

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
  <div class="container m-auto max-w-2xl p-4">
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <form @submit="addNewNote">
        <div>
          <Field name="newNote" :rules="validationSchema" v-slot="slotProps">
            <Input
              v-bind="slotProps.field"
              type="text"
              placeholder="Enter a new note"
              :class="{ 'border-destructive': errors.newNote }"
            />
          </Field>
          <span class="error-message">{{ errors.newNote }}</span>
        </div>
        <Button type="submit" :disabled="isSubmitting">Submit</Button>
      </form>
      <div class="flex justify-between items-center my-6">
        <h2 class="text-2xl font-bold">Your Notes</h2>
        <Button variant="outline" @click="hideImportant = !hideImportant">
          {{ hideImportant ? "Show All" : "Hide Important" }}
        </Button>
      </div>
      <ul class="space-y-3">
        <Note
          v-for="note in filteredNotes"
          :key="note.id"
          :note="note"
          @delete="deleteNote"
          @toggle-important="toggleImportant(note)"
        />
      </ul>
    </div>
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
