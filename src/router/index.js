import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../components/auth/LoginView.vue";
import RegisterView from "../components/auth/RegisterView.vue";
import ChatRoom from "../views/ChatRoomView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/chat/:id",
    name: "chat-room",
    component: ChatRoom,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/logout",
    name: "logout",
    component: {
      beforeRouteEnter(to, from, next) {
        localStorage.removeItem("user");
        next("/login");
      },
    },
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/profile",
    name: "profile",
    component: ChatRoom,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Navigation guard to check if the user is authenticated
router.beforeEach((to, from, next) => {
  if (to.name == "login" || to.name == "register") {
    if (localStorage.getItem("user")) {
      return next("/");
    }
  }

  // Check if the route requires authentication
  if (to.meta.requiresAuth) {
    // Check if the user is logged in
    if (!localStorage.getItem("user")) {
      return next("login");
    }
  }

  return next();
});

export default router;
