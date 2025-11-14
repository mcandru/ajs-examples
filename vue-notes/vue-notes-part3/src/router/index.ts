import { createRouter, createWebHistory } from "vue-router";
import NotesView from "@/views/Notes.vue";
import LoginView from "@/views/Login.vue";
import RegisterView from "@/views/Register.vue";
import ProfileView from "@/views/Profile.vue";
import { isLoggedIn } from "@/stores/auth";

const routes = [
  { path: "/", component: NotesView, meta: { requiresAuth: true } },
  { path: "/login", component: LoginView },
  { path: "/register", component: RegisterView },
  { path: "/profile", component: ProfileView, meta: { requiresAuth: true } },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to) => {
  if (to.meta.requiresAuth && !isLoggedIn.value) {
    return "/login";
  }
});

export default router;
