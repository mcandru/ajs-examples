import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import Home from "../views/Home.vue";
import User from "../views/User.vue";
import Post from "../views/Post.vue";

const routes: RouteRecordRaw[] = [
  // Add your routes here
  { path: "/", component: Home },
  { path: "/users/:id", component: User, props: true },
  { path: "/posts/:id", component: Post, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
