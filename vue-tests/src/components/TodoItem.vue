<script setup lang="ts">
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

defineProps<{
  todo: Todo;
}>();

const emit = defineEmits<{
  toggle: [id: number];
  delete: [id: number];
}>();
</script>

<template>
  <li :class="{ completed: todo.completed }" data-testid="todo-item">
    <span
      :data-testid="`todo-text-${todo.id}`"
      @click="emit('toggle', todo.id)"
      class="todo-text"
    >
      {{ todo.text }}
    </span>
    <button
      :data-testid="`delete-button-${todo.id}`"
      @click="emit('delete', todo.id)"
    >
      Delete
    </button>
  </li>
</template>

<style scoped>
li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.todo-text {
  flex: 1;
  cursor: pointer;
}

.completed .todo-text {
  text-decoration: line-through;
  color: #999;
}

button {
  padding: 4px 8px;
  cursor: pointer;
  border: 1px solid #f44336;
  border-radius: 4px;
  background: white;
  color: #f44336;
}

button:hover {
  background: #f44336;
  color: white;
}
</style>
