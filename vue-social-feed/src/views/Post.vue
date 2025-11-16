<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Post, User } from "@/types/api";
import apiService from "@/services/api";

const props = defineProps<{ id: string }>();

// TODO 1: Fetch post and user details from the API Service

onMounted(() => {});
</script>

<template>
  <div class="post-detail">
    <nav class="breadcrumb">
      <RouterLink to="/">Home</RouterLink>
      <span class="separator">›</span>
      <span>Post</span>
    </nav>

    <!-- TODO 3: Fill out post content -->
    <article class="post-full">
      <header class="post-header">
        <h1>{{ "Hello World" }}</h1>
        <div class="post-meta">
          <span class="author"
            >By <RouterLink to="">{{ "John Smith" }}</RouterLink></span
          >
        </div>
      </header>
      <div class="post-content">
        <p>{{ "My hello world post content..." }}</p>
      </div>
    </article>
  </div>
</template>
