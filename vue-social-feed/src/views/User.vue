<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Post, User } from "@/types/api";
import apiService from "@/services/api";

const props = defineProps<{ id: string }>();

// TODO 1: Use the user ID from the user parameter props to fetch user details and their posts

onMounted(() => {});
</script>

<template>
  <div class="user-profile">
    <nav class="breadcrumb">
      <RouterLink to="/">Home</RouterLink>
      <span class="separator">›</span>
      <span>User</span>
    </nav>

    <!-- TODO 3: Fill out the user card with the user information -->
    <div class="profile-card">
      <div class="profile-header">
        <div class="user-avatar large">
          <span class="avatar-initial">L</span>
        </div>
        <div class="profile-info">
          <h1>{{ "John Smith" }}</h1>
          <p class="user-email">{{ "john@smith.com" }}</p>
          <p class="user-detail">
            @{{ "thejohnsmith" }} • {{ "John Smith Co" }}
          </p>
        </div>
      </div>
      <div class="profile-details">
        <div class="detail-item">
          <strong>Phone:</strong> {{ "123 456789" }}
        </div>
        <div class="detail-item">
          <strong>Website:</strong> {{ "john.smith.com" }}
        </div>
        <div class="detail-item">
          <strong>Address:</strong> {{ "23" }}, {{ "Smith Street" }},
          {{ "New York" }}
        </div>
      </div>
    </div>

    <!-- TODO 4: Fill out the relevant posts -->
    <div class="posts-section">
      <h2>Posts by {{ "John Smith" }}</h2>
      <div class="posts-list">
        <article class="post-card">
          <h3>{{ "Hello World" }}</h3>
          <p class="post-body">
            {{ "My hello world post content..." }}
          </p>
          <RouterLink :to="`/posts/1`" class="btn-view"> Read More </RouterLink>
        </article>
      </div>
    </div>
  </div>
</template>
