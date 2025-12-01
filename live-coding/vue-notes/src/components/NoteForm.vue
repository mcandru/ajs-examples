<script setup lang="ts">
import { noteSchema } from "@/schemas/note";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm, Field } from "vee-validate";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const emit = defineEmits<{
  submit: [note: string];
}>();

const validationSchema = toTypedSchema(noteSchema);

const { handleSubmit, isSubmitting, errors, resetForm } = useForm({
  initialValues: {
    newNote: "",
  },
});

const onSubmit = handleSubmit((values) => {
  emit("submit", values.newNote);
  resetForm();
});
</script>

<template>
  <Card>
    <CardContent>
      <form @submit="onSubmit" class="space-y-4">
        <div>
          <Field name="newNote" :rules="validationSchema" v-slot="slotProps">
            <Input
              v-bind="slotProps.field"
              type="text"
              placeholder="Enter a new note"
              :class="{ 'border-destructive': errors.newNote }"
            />
          </Field>
          <span class="error-message">{{ errors.newNote }}</span>
        </div>
        <Button type="submit" :disabled="isSubmitting">Submit</Button>
      </form>
    </CardContent>
  </Card>
</template>
