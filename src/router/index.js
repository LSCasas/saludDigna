import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Agenda from "../views/Agenda.vue";

const routes = [
  { path: "/", name: "Login", component: Login },
  { path: "/agenda", name: "Agenda", component: Agenda },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
