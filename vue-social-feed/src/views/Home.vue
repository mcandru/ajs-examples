<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Post, User } from "@/types/api";
import apiService from "@/services/api";

// TODO 1: Fetch posts using the apiService and add them to a reactive variable to display

onMounted(() => {});
</script>

<template>
  <div class="home">
    <header class="page-header">
      <h1>Recent Posts</h1>
      <p>Explore posts from the community</p>
    </header>

    <div class="posts-feed">
      <!-- TODO 2: Implement displaying posts ordered by most recent -->
      <article class="post-card">
        <div class="post-header">
          <!-- TODO 3: Add link to user profile -->
          <RouterLink to="users/1" class="post-author">{{
            "John Smith"
          }}</RouterLink>
        </div>
        <h2 class="post-title">
          {{ "Hello World" }}
        </h2>
        <!-- TODO 4: Add link to post details -->
        <RouterLink to="posts/1" class="btn-view">Read More </RouterLink>
      </article>
    </div>
  </div>
</template>
