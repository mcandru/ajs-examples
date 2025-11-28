<script setup lang="ts">
import { Input } from "@/components/ui/input";
import { Field } from "vee-validate";
import { Label } from "@/components/ui/label";

defineProps<{
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
}>();
</script>

<template>
  <div class="space-y-2">
    <Field
      :name="name"
      :validate-on-model-update="false"
      v-slot="{ field, errorMessage }"
    >
      <Label v-if="label" for="name">{{ label }}</Label>
      <Input
        v-bind="field"
        :type="type"
        :placeholder="placeholder"
        :class="{ 'border-destructive': errorMessage }"
      />
      <span class="text-sm text-destructive">{{ errorMessage }}</span>
    </Field>
  </div>
</template>
