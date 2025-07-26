import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Pacientes from "../views/Pacientes.vue";

const routes = [
  { path: "/", name: "Login", component: Login },
  { path: "/pacientes", name: "Pacientes", component: Pacientes },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
