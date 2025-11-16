<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Post, User } from "@/types/api";
import apiService from "@/services/api";
import { useRouter } from "vue-router";

interface PostAndUser extends Post {
  user: User;
}

const router = useRouter();

// TODO 1: Fetch posts using the apiService and add them to a reactive variable to display
const postsWithUsers = ref<PostAndUser[]>([]);

onMounted(async () => {
  const [posts, users] = await Promise.all([
    apiService.getPosts(),
    apiService.getUsers(),
  ]);

  // Flat-map works by taking an array and mapping it to another array, then flattening the result
  postsWithUsers.value = posts.flatMap((post) => {
    const user = users.find((user) => user.id === post.userId);
    return user ? [{ ...post, user }] : [];
  });
});
</script>

<template>
  <div class="home">
    <header class="page-header">
      <h1>Recent Posts</h1>
      <p>Explore posts from the community</p>
    </header>

    <div class="posts-feed">
      <!-- TODO 2: Implement displaying posts ordered by most recent -->
      <article v-for="post in postsWithUsers" class="post-card" :key="post.id">
        <div class="post-header">
          <!-- TODO 3: Add link to user profile -->
          <RouterLink :to="`/users/${post.user.id}`" class="post-author">{{
            post.user.name
          }}</RouterLink>
        </div>
        <h2 class="post-title">
          {{ post.title }}
        </h2>
        <!-- TODO 4: Add link to post details -->
        <button class="btn-view" @click="router.push(`/posts/${post.id}`)">
          Read More
        </button>
      </article>
    </div>
  </div>
</template>
