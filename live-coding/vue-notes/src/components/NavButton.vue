<script setup lang="ts">
import { Button } from "@/components/ui/button";
const props = defineProps<{
  to: string;
}>();
</script>

<template>
  <RouterLink :to="props.to" v-slot="{ navigate, isActive }">
    <Button variant="ghost" :class="{ 'bg-accent': isActive }" @click="navigate"
      ><slot
    /></Button>
  </RouterLink>
</template>
