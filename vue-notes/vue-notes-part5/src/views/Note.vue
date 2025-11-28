<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { ref } from "vue";
import type { Note } from "@/types";
import noteService from "@/services/notes";
import { useToast } from "vue-toastification";
import { Spinner } from "@/components/ui/spinner";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardAction,
} from "@/components/ui/card";
import { Trash2, Star } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
} from "@/components/ui/empty";

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
  <div class="container m-auto max-w-2xl p-4">
    <!-- Display a back button that goes back to notes. Could also use router.back() if
     you want to preserve the full history-->
    <div v-if="isLoading"><Spinner class="size-8" /></div>
    <RouterLink to="/">Back to Notes</RouterLink>

    <Card>
      <CardHeader>
        <CardTitle class="text-2xl">Note Details</CardTitle>
        <CardAction>
          <Button variant="ghost" :disabled="!note" @click="toggleImportant">
            <Star
              :class="
                note?.important
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-400'
              "
            />
          </Button>
          <Button variant="ghost" :disabled="!note" @click="deleteNote"
            ><Trash2
          /></Button>
        </CardAction>
      </CardHeader>
      <CardContent v-if="note">
        <p>{{ note.content }}</p>
      </CardContent>
      <CardContent v-else>
        <Empty>
          <EmptyHeader>
            <EmptyTitle>Note does not exist</EmptyTitle>
            <EmptyDescription
              >Please select a note that exists</EmptyDescription
            >
          </EmptyHeader>
        </Empty>
      </CardContent>
    </Card>
  </div>
</template>
