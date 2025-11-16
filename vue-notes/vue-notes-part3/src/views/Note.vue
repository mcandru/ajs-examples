<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { ref } from "vue";
import type { Note } from "@/types";
import noteService from "@/services/notes";

const props = defineProps<{ id: string }>();

const router = useRouter();
const note = ref<Note | null>(null);
const isLoading = ref(true);

onMounted(async () => {
  note.value = await noteService.getNote(props.id);
  isLoading.value = false;
});

const toggleImportant = async () => {
  if (!note.value) return;
  const { id, content, important } = note.value;
  const result = await noteService.updateNote(id, content, !important);
  note.value.important = result.important;
};

const deleteNote = async () => {
  await noteService.deleteNote(props.id);
  router.push("/");
};
</script>

<template>
  <!-- Display a back button that goes back to notes. Could also use router.back() if
   you want to preserve the full history-->
  <button @click="router.push('/')">Back to Notes</button>

  <div v-if="isLoading">Loading...</div>
  <div v-if="note">
    <button @click="deleteNote">X</button>
    <button @click="toggleImportant">
      {{ note.important ? "Make Normal" : "Make Important" }}
    </button>
    <p>{{ note.content }}</p>
  </div>
</template>
