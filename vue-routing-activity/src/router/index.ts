import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import UserProfile from '../views/UserProfile.vue'
import PostDetail from '../views/PostDetail.vue'

// TODO 1: Configure the routes
// You need to define three routes:
// 1. Home page at path '/' using the Home component
// 2. User profile at path '/users/:id' using the UserProfile component
//    - This should accept a dynamic :id parameter
// 3. Post detail at path '/posts/:id' using the PostDetail component
//    - This should accept a dynamic :id parameter

const routes: RouteRecordRaw[] = [
  // Add your routes here
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
