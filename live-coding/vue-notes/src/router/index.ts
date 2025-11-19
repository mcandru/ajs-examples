import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Note from "@/views/Note.vue";
import Profile from "@/views/Profile.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/profile", component: Profile },
  { path: "/notes/:id", component: Note, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
