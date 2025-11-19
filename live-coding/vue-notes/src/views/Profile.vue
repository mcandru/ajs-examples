<script setup lang="ts">
import axios from "axios";
const handleLogout = async () => {
  await axios.post("/api/auth/logout");
};
</script>

<template>
  <h1>Michael's Profile</h1>
  <p>michael@example.com</p>
  <button @click="handleLogout">Logout</button>
</template>
