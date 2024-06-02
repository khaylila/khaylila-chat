import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../components/auth/LoginView.vue";
import RegisterView from "../components/auth/RegisterView.vue";
import NewChat from "../views/NewChatView.vue";
import ChatRoom from "../views/ChatRoomView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/newchat",
    name: "newchat",
    component: NewChat,
  },
  {
    path: "/chat/:id",
    name: "chat-room",
    component: ChatRoom,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
  // {
  //   path: "/logout",
  //   name: "logout",
  //   component: LogoutView,
  // },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
