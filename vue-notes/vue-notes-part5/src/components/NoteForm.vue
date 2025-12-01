<script setup lang="ts">
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import { noteSchema } from "@/schemas/note";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm, Field } from "vee-validate";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const emit = defineEmits<{ submit: [note: string] }>();

const validationSchema = toTypedSchema(noteSchema);

const { handleSubmit, isSubmitting, errors, resetForm } = useForm({
  validationSchema,
  initialValues: {
    content: "",
  },
});

const onSubmit = handleSubmit(async (values) => {
  emit("submit", values.content);
  resetForm();
});
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Add New Note</CardTitle>
    </CardHeader>
    <CardContent>
      <form @submit="onSubmit" class="space-y-4">
        <div>
          <Field
            name="content"
            :validateOnModelUpdate="false"
            v-slot="{ field }"
          >
            <Input
              v-bind="field"
              type="text"
              placeholder="Enter a new note"
              :class="{ 'border-destructive': errors.content }"
            />
          </Field>
          <span class="text-sm text-destructive">{{ errors.content }}</span>
        </div>
        <Button type="submit" :disabled="isSubmitting">Add Note</Button>
      </form>
    </CardContent>
  </Card>
</template>
