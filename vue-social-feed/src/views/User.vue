<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import type { Post, User } from "@/types/api";
import apiService from "@/services/api";

const props = defineProps<{ id: string }>();

const router = useRouter();

// TODO 1: Use the user ID from the user parameter props to fetch user details and their posts
const user = ref<User | null>(null);
const posts = ref<Post[] | null>(null);

onMounted(async () => {
  const [userRes, postsRes] = await Promise.all([
    apiService.getUser(props.id),
    apiService.getUserPosts(props.id),
  ]);

  user.value = userRes;
  posts.value = postsRes;
});
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
        <div class="profile-info" v-if="user">
          <h1>{{ user.name }}</h1>
          <p class="user-email">{{ user.email }}</p>
          <p class="user-detail">
            @{{ user.username }} • {{ user.company.name }}
          </p>
        </div>
      </div>
      <div class="profile-details" v-if="user">
        <div class="detail-item"><strong>Phone:</strong> {{ user.phone }}</div>
        <div class="detail-item">
          <strong>Website:</strong> {{ user.website }}
        </div>
        <div class="detail-item">
          <strong>Address:</strong> {{ user.address.suite }},
          {{ user.address.street }}, {{ user.address.city }}
        </div>
      </div>
    </div>

    <!-- TODO 4: Fill out the relevant posts -->
    <div class="posts-section">
      <h2 v-if="user">Posts by {{ user.name }}</h2>
      <div class="posts-list">
        <article class="post-card" v-for="post in posts" :key="post.id">
          <h3>{{ post.title }}</h3>
          <p class="post-body">
            {{ post.body }}
          </p>
          <RouterLink :to="`/posts/${post.id}`" class="btn-view">
            Read More
          </RouterLink>
        </article>
      </div>
    </div>
  </div>
</template>
