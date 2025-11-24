import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Note from "@/views/Note.vue";
import Profile from "@/views/Profile.vue";
import { isLoggedIn, checkAuth, hasCheckedAuth } from "@/stores/auth";

const routes = [
  { path: "/", component: Home, meta: { requiresAuth: true } },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/profile", component: Profile, meta: { requiresAuth: true } },
  {
    path: "/notes/:id",
    component: Note,
    props: true,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to) => {
  if (!hasCheckedAuth.value) {
    await checkAuth();
  }

  if (to.meta.requiresAuth && !isLoggedIn.value) {
    return "/login";
  }
});

export default router;
