import { createRouter, createWebHistory } from "vue-router";
import NotesView from "@/views/Notes.vue";
import LoginView from "@/views/Login.vue";
import NoteView from "@/views/Note.vue";
import RegisterView from "@/views/Register.vue";
import ProfileView from "@/views/Profile.vue";
import { checkAuth, hasCheckedAuth, isLoggedIn } from "@/stores/auth";
import { useToast } from "vue-toastification";

const toast = useToast();

const routes = [
  { path: "/", component: NotesView, meta: { requiresAuth: true } },
  { path: "/login", component: LoginView },
  { path: "/register", component: RegisterView },
  { path: "/profile", component: ProfileView, meta: { requiresAuth: true } },
  {
    path: "/notes/:id",
    component: NoteView,
    meta: { requiresAuth: true },
    props: true, // Takes any route parameters into the view component as props
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to) => {
  // Check auth once per session on first navigation
  if (!hasCheckedAuth.value) {
    try {
      await checkAuth();
    } catch (error) {
      toast.error("Error checking authentication status.");
    }
  }

  // Redirect to login if trying to access protected route while not authenticated
  if (to.meta.requiresAuth && !isLoggedIn.value) {
    return "/login";
  }
});

export default router;
