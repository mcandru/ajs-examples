<script setup lang="ts">
import { ref } from 'vue';
import TodoItem, { type Todo } from './TodoItem.vue';

const todos = ref<Todo[]>([
  { id: 1, text: 'Learn Vue', completed: false },
  { id: 2, text: 'Write tests', completed: false },
]);

const newTodoText = ref('');

const addTodo = () => {
  if (newTodoText.value.trim()) {
    const newTodo: Todo = {
      id: Date.now(),
      text: newTodoText.value,
      completed: false,
    };
    todos.value.push(newTodo);
    newTodoText.value = '';
  }
};

const toggleTodo = (id: number) => {
  const todo = todos.value.find((t) => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
  }
};

const deleteTodo = (id: number) => {
  todos.value = todos.value.filter((t) => t.id !== id);
};
</script>

<template>
  <div class="todo-list">
    <h2>Todo List</h2>
    <div class="add-todo">
      <input
        v-model="newTodoText"
        data-testid="new-todo-input"
        placeholder="Add a new todo"
        @keyup.enter="addTodo"
      />
      <button data-testid="add-todo-button" @click="addTodo">Add</button>
    </div>
    <ul data-testid="todo-list">
      <TodoItem
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @toggle="toggleTodo"
        @delete="deleteTodo"
      />
    </ul>
    <p v-if="todos.length === 0" data-testid="empty-message">
      No todos yet. Add one above!
    </p>
  </div>
</template>

<style scoped>
.todo-list {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  max-width: 400px;
}

.add-todo {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 8px 16px;
  cursor: pointer;
  border: 1px solid #4caf50;
  border-radius: 4px;
  background: white;
  color: #4caf50;
}

button:hover {
  background: #4caf50;
  color: white;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
