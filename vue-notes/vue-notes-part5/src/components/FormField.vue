<script setup lang="ts">
import { Input } from "@/components/ui/input";
import { Field } from "vee-validate";
import { Label } from "@/components/ui/label";

defineProps<{
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  error?: string;
}>();
</script>

<template>
  <div class="space-y-2">
    <Field :name="name" v-slot="{ field }">
      <Label v-if="label" for="name">{{ label }}</Label>
      <Input
        v-bind="field"
        :type="type"
        :placeholder="placeholder"
        :class="{ 'border-destructive': error }"
      />
      <span class="text-sm text-destructive">{{ error }}</span>
    </Field>
  </div>
</template>
