<script setup>
import { ref, computed, onMounted } from "vue";

let id = 0;

const hideImportant = ref(false);
const newNote = ref("");
const notes = ref([
  {
    id: id++,
    content: "This is my first note",
    important: true,
  },
  {
    id: id++,
    content: "Remember to buy groceries",
    important: false,
  },
  {
    id: id++,
    content: "Meeting at 3 PM tomorrow",
    important: true,
  },
]);
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
    id: id++,
    content: newNote.value,
    important: false,
  });
};

const deleteNote = (noteToDelete) => {
  notes.value = notes.value.filter((note) => note !== noteToDelete);
};
</script>

<template>
  <form @submit.prevent="addNewNote">
    <input type="text" v-model="newNote" />
    <button type="submit">Submit</button>
  </form>

  <ul>
    <li v-for="note in filteredNotes" :key="note.id">
      {{ note.content }}
      <button class="action-button" @click="deleteNote(note)">X</button>
      <button class="action-button" @click="note.important = !note.important">
        {{ note.important ? "Make Normal" : "Make Important" }}
      </button>
    </li>
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
