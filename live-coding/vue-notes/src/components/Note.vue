<script setup lang="ts">
import type { Note } from "@/types/index";
import { RouterLink } from "vue-router";
import { Item, ItemContent, ItemActions } from "@/components/ui/item";
import { Button } from "@/components/ui/button";
import { Star, Trash2 } from "lucide-vue-next";
defineProps<{
  note: Note;
}>();

const emit = defineEmits<{
  delete: [note: Note];
  "toggle-important": [];
}>();
</script>

<template>
  <li>
    <Item variant="outline">
      <ItemContent
        ><RouterLink :to="`notes/${note.id}`">{{
          note.content
        }}</RouterLink></ItemContent
      >
      <ItemActions>
        <Button variant="ghost" @click="emit('delete', note)"
          ><Trash2
        /></Button>
        <Button
          variant="ghost"
          class="action-button"
          @click="emit('toggle-important')"
        >
          <Star
            :class="
              note.important
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-400'
            "
          />
        </Button>
      </ItemActions>
    </Item>
  </li>
</template>
