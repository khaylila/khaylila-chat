<template>
  <section id="main">
    <div class="mx-auto container">
      <img
        src="../../assets/logo.png"
        class="mt-12 w-36 rounded-full border-1 border-slate-700 block mx-auto"
        alt=""
      />
      <div
        class="rounded-md border border-t-purple-700 border-t-2 mt-12 p-4 w-96 mx-auto"
      >
        <div class="py-4">
          <h1 class="text-xl font-semibold text-slate-600 text-left">Login</h1>
          <form
            class="mt-8"
            action="/login"
            method="POST"
            @submit.prevent="handleSubmitLoginUser"
          >
            <div class="relative">
              <input
                id="username"
                v-model="user.username"
                name="username"
                type="text"
                class="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-purple-600"
                placeholder="john@doe.com"
              />
              <label
                for="username"
                class="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                >Username</label
              >
            </div>
            <div class="mt-10 relative">
              <input
                id="password"
                v-model="user.password"
                type="password"
                name="password"
                class="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-purple-600"
                placeholder="Password"
              />
              <label
                for="password"
                class="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                >Password</label
              >
            </div>
            <button
              type="submit"
              class="mt-8 px-4 py-2 rounded bg-purple-500 hover:bg-purple-400 text-white font-semibold text-center block w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-purple-500 focus:ring-opacity-80 cursor-pointer"
            >
              Masuk
            </button>
          </form>
          <p class="mt-4 block text-slate-500 text-xs text-center">
            Don't have an account?
            <router-link
              class="text-purple-600 hover:underline focus:outline-none focus:ring-2 focus:ring-purple-500"
              :to="{ name: 'register' }"
            >
              Create One
            </router-link>
          </p>
        </div>
      </div>

      <footer class="my-8 text-xs">
        Copyright&copy; 2024 &dash;
        <a
          class="text-purple-600 hover:underline focus:outline-none focus:ring-2 focus:ring-purple-500"
          href="http://github.com/khaylila"
          >Khaylila</a
        >
      </footer>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { db } from "@/firebase";
import { collection, query, getDocs, where, limit } from "firebase/firestore";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";

const router = useRouter();

const user = ref({
  username: "",
  password: "",
});

const submitForm = ref(false);

const handleSubmitLoginUser = async () => {
  if (user.value.username != "" && user.value.password != "") {
    const q = query(
      collection(db, "users"),
      where("username", "==", user.value.username),
      limit(1)
    );

    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Akun tidak ditemukan!",
      });
    } else {
      querySnapshot.forEach((doc) => {
        if (user.value.password != doc.data().password) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Kata sandi tidak sesuai!",
          });
        } else {
          localStorage.setItem("user", doc.id);
          router.push({ name: "home" });
        }
      });
    }
  }
};
</script>

<style></style>
