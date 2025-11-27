<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { ref } from "vue";
import type { Note } from "@/types";
import noteService from "@/services/notes";
import { useToast } from "vue-toastification";

const props = defineProps<{ id: string }>();

const router = useRouter();
const toast = useToast();
const note = ref<Note | null>(null);
const isLoading = ref(true);

onMounted(async () => {
  try {
    note.value = await noteService.getNote(props.id);
  } catch (error: unknown) {
    toast.error("Error loading note.");
  } finally {
    isLoading.value = false;
  }
});

const toggleImportant = async () => {
  if (!note.value) return;
  const { id, content, important } = note.value;
  try {
    await noteService.updateNote(id, content, !important);
    note.value.important = !important;
  } catch (error: unknown) {
    toast.error("Failed to update note importance.");
  }
};

const deleteNote = async () => {
  try {
    await noteService.deleteNote(props.id);
    router.push("/");
  } catch (error: unknown) {
    toast.error("Failed to delete note.");
  }
};
</script>

<template>
  <!-- Display a back button that goes back to notes. Could also use router.back() if
   you want to preserve the full history-->
  <RouterLink to="/">Back to Notes</RouterLink>

  <div v-if="isLoading">Loading...</div>
  <div v-if="note">
    <button @click="deleteNote">X</button>
    <button @click="toggleImportant">
      {{ note.important ? "Make Normal" : "Make Important" }}
    </button>
    <p>{{ note.content }}</p>
  </div>
</template>
