<script setup lang="ts">
import { Field } from "vee-validate";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

defineProps<{
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
}>();
</script>
<template>
  <div class="space-y-2">
    <Field :name="name" v-slot="{ field, errorMessage }">
      <Label v-if="label">{{ label }}</Label>
      <Input
        v-bind="field"
        :type="type"
        :placeholder="placeholder"
        :class="{ 'border-destructive': errorMessage }"
      />
      <span class="text-destructive">{{ errorMessage }}</span>
    </Field>
  </div>
</template>
