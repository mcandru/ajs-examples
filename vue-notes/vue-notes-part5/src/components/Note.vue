<script setup lang="ts">
import type { Note } from "@/types/index";
import { RouterLink } from "vue-router";
import { Card, CardContent } from "@/components/ui/card";
import Button from "@/components/ui/button/Button.vue";
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
    <Card>
      <CardContent>
        <div class="flex items-center justify-between">
          <div>
            <RouterLink :to="`notes/${note.id}`">{{ note.content }}</RouterLink>
          </div>
          <div>
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
            <Button variant="ghost" @click="emit('delete', note)"
              ><Trash2 class="text-red-400"
            /></Button>
          </div>
        </div>
      </CardContent>
    </Card>
  </li>
</template>
