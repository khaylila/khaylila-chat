<template>
  <header v-if="!type" class="flex justify-between bg-purple-600 py-2 px-3">
    <h1 class="text-xl font-bold text-white">Khaylila-Chat</h1>
    <div class="relative inline-block text-left">
      <div>
        <button
          type="button"
          class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          @click="handleToggleClick"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 fill-purple-500 hover:fill-purple-700"
            viewBox="0 0 512 512"
          >
            <path
              d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"
            />
          </svg>
          <svg
            class="-mr-1 h-5 w-5 fill-purple-500 hover:fill-purple-700"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div
        class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        :class="toggleMenu ? '' : 'hidden'"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabindex="-1"
      >
        <div class="py-1" role="none">
          <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
          <!-- <a
            href="/profile"
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-200"
            role="menuitem"
            tabindex="-1"
            id="menu-item-0"
            >Profile</a
          > -->
          <router-link
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-200"
            role="menuitem"
            tabindex="-1"
            id="menu-item-0"
            :to="{ name: 'profile' }"
          >
            Profile
          </router-link>
          <form
            method="POST"
            action="#"
            role="none"
            @submit.prevent="handleLogoutButton"
          >
            <button
              type="submit"
              class="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-slate-200"
              role="menuitem"
              tabindex="-1"
              id="menu-item-3"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>
    </div>
  </header>
  <header v-else class="flex flex-row items-center bg-purple-600 py-2 px-3">
    <button class="mr-3" @click="handleBackToContact">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-3 fill-white"
        viewBox="0 0 320 512"
      >
        <path
          d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
        />
      </svg>
    </button>
    <img
      src="../assets/logo.png"
      class="w-7 rounded-full mr-2 border border-slate-400"
      alt="profile"
    />
    <h1 class="text-xl font-semibold text-white line-clamp-1">
      {{ name }}
    </h1>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

const router = useRouter();
const { type, name } = defineProps(["type", "name"]);
const toggleMenu = ref(false);

const handleBackToContact = () => {
  router.push({ name: "home" });
};

const handleToggleClick = () => {
  toggleMenu.value = !toggleMenu.value;
};

const handleLogoutButton = () => {
  Swal.fire({
    title: "Yakin ingin keluar?",
    showCancelButton: true,
    confirmButtonText: "Ok",
  }).then((result) => {
    if (result.isConfirmed) {
      router.push({ name: "logout" });
    }
  });
};
</script>
