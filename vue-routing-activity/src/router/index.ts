import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import Home from "../views/Home.vue";
import UserProfile from "../views/UserProfile.vue";
import Post from "../views/Post.vue";

const routes: RouteRecordRaw[] = [
  // Add your routes here
  { path: "/", component: Home },
  { path: "/users/:id", component: UserProfile, props: true },
  { path: "/posts/:id", component: Post, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
