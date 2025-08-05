import { createRouter, createWebHistory } from "vue-router";
import { ref } from "vue";
import Login from "../views/Login.vue";
import Pacientes from "../views/Pacientes.vue";
import Agenda from "../views/Agenda.vue";
import { useAuthStore } from "../stores/auth";

const routes = [
  { path: "/", name: "Login", component: Login },
  { path: "/pacientes", name: "Pacientes", component: Pacientes },
  { path: "/agenda", name: "Agenda", component: Agenda },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export const isLoading = ref(false);

router.beforeEach(async (to, from, next) => {
  isLoading.value = true;

  if (to.path === "/") {
    isLoading.value = false;
    return next();
  }

  const authStore = useAuthStore();

  try {
    await authStore.fetchUser();
    if (authStore.user) {
      next();
    } else {
      next("/");
    }
  } catch (error) {
    next("/");
  }
});

router.afterEach(() => {
  isLoading.value = false;
});

export default router;
