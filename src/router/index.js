import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),

    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/blog",
      name: "blog",
      component: () => import("../views/BlogView.vue"),
    },
    {
      path: "/ong/:id",
      name: "ong",
      component: () => import("../views/OngView.vue"),
    },
    {
      path: "/perfil",
      name: "perfil",      
      component: () => import("../views/PerfilView.vue"),
    },
  ],
});

export default router;
