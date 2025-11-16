<template>
  <div class="home">
    <header class="page-header">
      <h1>Social Feed</h1>
      <p>Click on a user to view their profile and posts</p>
    </header>

    <!-- TODO 2a: Fetch and display the list of users -->
    <!-- Use the getUsers() function from the API service -->
    <!-- Display a loading state while fetching -->
    <!-- Loop through users and display them in cards -->

    <div class="loading" v-if="false">
      <p>Loading users...</p>
    </div>

    <div class="user-grid">
      <!-- Sample user card - replace with v-for loop over users -->
      <div class="user-card">
        <div class="user-avatar">
          <span class="avatar-initial">L</span>
        </div>
        <div class="user-info">
          <h3>Leanne Graham</h3>
          <p class="user-email">Sincere@april.biz</p>
          <p class="user-company">Romaguera-Crona</p>
        </div>
        <button class="btn-view">View Profile</button>
      </div>

      <div class="user-card">
        <div class="user-avatar">
          <span class="avatar-initial">E</span>
        </div>
        <div class="user-info">
          <h3>Ervin Howell</h3>
          <p class="user-email">Shanna@melissa.tv</p>
          <p class="user-company">Deckow-Crist</p>
        </div>
        <button class="btn-view">View Profile</button>
      </div>

      <div class="user-card">
        <div class="user-avatar">
          <span class="avatar-initial">C</span>
        </div>
        <div class="user-info">
          <h3>Clementine Bauch</h3>
          <p class="user-email">Nathan@yesenia.net</p>
          <p class="user-company">Romaguera-Jacobson</p>
        </div>
        <button class="btn-view">View Profile</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
// TODO 2b: Import the API functions and useRouter
// import { getUsers, type User } from '../services/api'
// import { useRouter } from 'vue-router'

// TODO 2c: Create reactive state for users and loading
// const users = ref<User[]>([])
// const loading = ref(true)

// TODO 2d: Create a function to fetch users
// const fetchUsers = async () => {
//   try {
//     loading.value = true
//     users.value = await getUsers()
//   } catch (error) {
//     console.error('Error fetching users:', error)
//   } finally {
//     loading.value = false
//   }
// }

// TODO 2e: Fetch users when component mounts
// onMounted(() => {
//   fetchUsers()
// })

// TODO 2f: Create a function to navigate to user profile
// const router = useRouter()
// const viewProfile = (userId: number) => {
//   router.push(`/users/${userId}`)
// }
</script>
