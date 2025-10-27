import { createRouter, createWebHistory } from "vue-router";
import NotesView from "@/views/Notes.vue";
import LoginView from "@/views/Login.vue";
import RegisterView from "@/views/Register.vue";
import ProfileView from "@/views/Profile.vue";

const routes = [
  { path: "/", component: NotesView },
  { path: "/login", component: LoginView },
  { path: "/register", component: RegisterView },
  { path: "/profile", component: ProfileView },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
