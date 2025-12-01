<script setup lang="ts">
import { Button } from "@/components/ui/button";

defineProps<{ to: string }>();
</script>

<template>
  <RouterLink :to="to" v-slot="{ isActive }"
    ><Button variant="ghost" :class="{ 'bg-accent': isActive }"><slot /></Button
  ></RouterLink>
</template>
