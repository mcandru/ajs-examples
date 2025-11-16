<template>
  <div class="user-profile">
    <nav class="breadcrumb">
      <router-link to="/">Home</router-link>
      <span class="separator">›</span>
      <span>User Profile</span>
    </nav>

    <!-- TODO 3a: Get the user ID from the route params -->
    <!-- Use useRoute() to access route.params.id -->
    <!-- Fetch user details and their posts using the API service -->

    <div class="loading" v-if="false">
      <p>Loading profile...</p>
    </div>

    <!-- User Info Card -->
    <div class="profile-card">
      <div class="profile-header">
        <div class="user-avatar large">
          <span class="avatar-initial">L</span>
        </div>
        <div class="profile-info">
          <h1>Leanne Graham</h1>
          <p class="user-email">Sincere@april.biz</p>
          <p class="user-detail">@leanne • Romaguera-Crona</p>
        </div>
      </div>
      <div class="profile-details">
        <div class="detail-item">
          <strong>Phone:</strong> 1-770-736-8031 x56442
        </div>
        <div class="detail-item">
          <strong>Website:</strong> hildegard.org
        </div>
        <div class="detail-item">
          <strong>Address:</strong> Kulas Light, Apt. 556, Gwenborough
        </div>
      </div>
    </div>

    <!-- Posts Section -->
    <div class="posts-section">
      <h2>Posts by Leanne Graham</h2>

      <div class="loading" v-if="false">
        <p>Loading posts...</p>
      </div>

      <div class="posts-list">
        <!-- Sample post card - replace with v-for loop over posts -->
        <article class="post-card">
          <h3>sunt aut facere repellat provident</h3>
          <p class="post-body">
            quia et suscipit suscipit recusandae consequuntur expedita et cum
            reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem
            eveniet architecto
          </p>
          <button class="btn-view">Read More</button>
        </article>

        <article class="post-card">
          <h3>qui est esse</h3>
          <p class="post-body">
            est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea
            dolores neque fugiat blanditiis voluptate porro vel nihil molestiae ut
            reiciendis qui aperiam non debitis
          </p>
          <button class="btn-view">Read More</button>
        </article>

        <article class="post-card">
          <h3>ea molestias quasi exercitationem</h3>
          <p class="post-body">
            et iusto sed quo iure voluptatem occaecati omnis eligendi aut ad
            voluptatem doloribus vel accusantium quis pariatur molestiae porro eius
            odio et labore et velit aut
          </p>
          <button class="btn-view">Read More</button>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
// TODO 3b: Import necessary functions
// import { useRoute, useRouter } from 'vue-router'
// import { getUser, getUserPosts, type User, type Post } from '../services/api'

// TODO 3c: Get the route and router
// const route = useRoute()
// const router = useRouter()

// TODO 3d: Create reactive state
// const user = ref<User | null>(null)
// const posts = ref<Post[]>([])
// const loading = ref(true)

// TODO 3e: Create a function to fetch user data
// const fetchUserData = async () => {
//   try {
//     loading.value = true
//     const userId = route.params.id as string
//
//     // Fetch user details and their posts
//     const [userData, userPosts] = await Promise.all([
//       getUser(userId),
//       getUserPosts(userId)
//     ])
//
//     user.value = userData
//     posts.value = userPosts
//   } catch (error) {
//     console.error('Error fetching user data:', error)
//   } finally {
//     loading.value = false
//   }
// }

// TODO 3f: Fetch data when component mounts
// onMounted(() => {
//   fetchUserData()
// })

// TODO 3g: Create a function to navigate to post detail
// const viewPost = (postId: number) => {
//   router.push(`/posts/${postId}`)
// }
</script>
