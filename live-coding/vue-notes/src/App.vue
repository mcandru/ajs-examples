<script setup lang="ts"></script>

<template>
  <h1>Notes</h1>
  <nav>
    <RouterLink to="/" class="nav-link">Notes</RouterLink>
    <RouterLink to="/login" class="nav-link">Login</RouterLink>
    <RouterLink to="/register" class="nav-link">Register</RouterLink>
  </nav>
  <RouterView />
</template>

<style scoped>
.nav-link {
  margin-right: 10px;
}
</style>
