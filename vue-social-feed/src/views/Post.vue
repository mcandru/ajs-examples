<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Post, User } from "@/types/api";
import apiService from "@/services/api";

const props = defineProps<{ id: string }>();

// TODO 1: Fetch post and user details from the API Service
const post = ref<Post | null>(null);
const user = ref<User | null>(null);

onMounted(async () => {
  post.value = await apiService.getPost(props.id);
  user.value = await apiService.getUser(post.value.userId);
});
</script>

<template>
  <div class="post-detail">
    <nav class="breadcrumb">
      <RouterLink to="/">Home</RouterLink>
      <span class="separator">›</span>
      <span>Post</span>
    </nav>

    <!-- TODO 3: Fill out post content -->
    <article class="post-full" v-if="post">
      <header class="post-header">
        <h1>{{ post.title }}</h1>
        <div class="post-meta">
          <span class="author" v-if="user"
            >By
            <RouterLink :to="`/users/${user.id}`">{{
              user.name
            }}</RouterLink></span
          >
        </div>
      </header>
      <div class="post-content">
        <p>{{ post.body }}</p>
      </div>
    </article>
  </div>
</template>
