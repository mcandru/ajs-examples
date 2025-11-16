<template>
  <div class="post-detail">
    <nav class="breadcrumb">
      <router-link to="/">Home</router-link>
      <span class="separator">›</span>
      <router-link :to="`/users/1`">User Profile</router-link>
      <span class="separator">›</span>
      <span>Post</span>
    </nav>

    <!-- TODO 4a: Get the post ID from route params -->
    <!-- Fetch the post details and comments using the API service -->
    <!-- Also fetch the author information for the breadcrumb -->

    <div class="loading" v-if="false">
      <p>Loading post...</p>
    </div>

    <!-- Post Content -->
    <article class="post-full">
      <header class="post-header">
        <h1>sunt aut facere repellat provident occaecati excepturi</h1>
        <div class="post-meta">
          <span class="author">By Leanne Graham</span>
          <span class="separator">•</span>
          <span>Post #1</span>
        </div>
      </header>
      <div class="post-content">
        <p>
          quia et suscipit suscipit recusandae consequuntur expedita et cum
          reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem
          eveniet architecto
        </p>
      </div>
    </article>

    <!-- Comments Section -->
    <section class="comments-section">
      <h2>Comments (5)</h2>

      <div class="loading" v-if="false">
        <p>Loading comments...</p>
      </div>

      <div class="comments-list">
        <!-- Sample comments - replace with v-for loop -->
        <div class="comment">
          <div class="comment-avatar">
            <span class="avatar-initial">I</span>
          </div>
          <div class="comment-content">
            <div class="comment-header">
              <strong class="comment-author">Eliseo@gardner.biz</strong>
            </div>
            <h4 class="comment-title">id labore ex et quam laborum</h4>
            <p class="comment-body">
              laudantium enim quasi est quidem magnam voluptate ipsam eos tempora quo
              necessitatibus dolor quam autem quasi reiciendis et nam sapiente accusantium
            </p>
          </div>
        </div>

        <div class="comment">
          <div class="comment-avatar">
            <span class="avatar-initial">J</span>
          </div>
          <div class="comment-content">
            <div class="comment-header">
              <strong class="comment-author">Jayne_Kuhic@sydney.com</strong>
            </div>
            <h4 class="comment-title">quo vero reiciendis velit similique earum</h4>
            <p class="comment-body">
              est natus enim nihil est dolore omnis voluptatem numquam et omnis occaecati
              quod ullam at voluptatem error expedita pariatur nihil sint nostrum
              voluptatem reiciendis et
            </p>
          </div>
        </div>

        <div class="comment">
          <div class="comment-avatar">
            <span class="avatar-initial">N</span>
          </div>
          <div class="comment-content">
            <div class="comment-header">
              <strong class="comment-author">Nikita@garfield.biz</strong>
            </div>
            <h4 class="comment-title">odio adipisci rerum aut animi</h4>
            <p class="comment-body">
              quia molestiae reprehenderit quasi aspernatur aut expedita occaecati
              aliquam eveniet laudantium omnis quibusdam delectus saepe quia accusamus
              maiores nam est cum et ducimus et vero voluptates
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
// TODO 4b: Import necessary functions
// import { useRoute } from 'vue-router'
// import { getPost, getPostComments, getUser, type Post, type Comment, type User } from '../services/api'

// TODO 4c: Get the route
// const route = useRoute()

// TODO 4d: Create reactive state
// const post = ref<Post | null>(null)
// const comments = ref<Comment[]>([])
// const author = ref<User | null>(null)
// const loading = ref(true)

// TODO 4e: Create a function to fetch post data
// const fetchPostData = async () => {
//   try {
//     loading.value = true
//     const postId = route.params.id as string
//
//     // Fetch post and comments
//     const [postData, postComments] = await Promise.all([
//       getPost(postId),
//       getPostComments(postId)
//     ])
//
//     post.value = postData
//     comments.value = postComments
//
//     // Fetch the author info for the breadcrumb
//     const authorData = await getUser(postData.userId)
//     author.value = authorData
//   } catch (error) {
//     console.error('Error fetching post data:', error)
//   } finally {
//     loading.value = false
//   }
// }

// TODO 4f: Fetch data when component mounts
// onMounted(() => {
//   fetchPostData()
// })
</script>
