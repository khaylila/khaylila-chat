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
          <h1 class="text-xl font-semibold text-slate-600 text-left">
            Register
          </h1>
          <form
            class="mt-8"
            action="/register"
            method="POST"
            @submit.prevent="handleSubmitRegisterUser"
          >
            <!-- <div class="mt-8"> -->
            <div class="relative">
              <input
                id="fullname"
                v-model="newUser.fullname"
                name="fullname"
                type="text"
                class="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-purple-600"
                placeholder="john@doe.com"
              />
              <label
                for="fullname"
                class="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                >Fullname</label
              >
            </div>
            <div class="mt-8 relative">
              <input
                id="username"
                v-model="newUser.username"
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
            <div class="mt-8 relative">
              <input
                id="password"
                v-model="newUser.password"
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
            <div class="mt-8 relative">
              <input
                id="repeatPassword"
                v-model="newUser.repeatPassword"
                type="password"
                name="repeatPassword"
                class="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-purple-600"
                placeholder="repeatPassword"
              />
              <label
                for="repeatPassword"
                class="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                >Repeat Password</label
              >
            </div>
            <button
              v-if="!submitForm"
              type="submit"
              class="mt-8 px-4 py-2 rounded bg-purple-500 hover:bg-purple-400 text-white font-semibold text-center block w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-purple-500 focus:ring-opacity-80 cursor-pointer"
            >
              Daftar
            </button>
            <button
              v-else
              type="button"
              class="mt-8 px-4 py-2 rounded bg-purple-300 text-white font-semibold text-center block w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-purple-500 focus:ring-opacity-80 cursor-pointer"
              disabled
            >
              <svg
                class="animate-spin mx-auto h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </button>
          </form>
          <!-- </div> -->
          <p class="mt-4 block text-slate-500 text-xs text-center">
            Already have an account?
            <router-link
              class="text-purple-600 hover:underline focus:outline-none focus:ring-2 focus:ring-purple-500"
              :to="{ name: 'login' }"
            >
              Masuk
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
import {
  collection,
  addDoc,
  query,
  getDocs,
  where,
  limit,
} from "firebase/firestore";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";

const router = useRouter();

const newUser = ref({
  username: "",
  fullname: "",
  password: "",
  repeatPassword: "",
});

const submitForm = ref(false);

const handleSubmitRegisterUser = async () => {
  if (!submitForm.value) {
    submitForm.value = true;
    if (newUser.value.password.length < 4) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password minimal 4 karakter!",
      });
      submitForm.value = false;
    } else if (newUser.value.password !== newUser.value.repeatPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Kata sandi tidak sesuai!",
      });
      submitForm.value = false;
    } else {
      const q = query(
        collection(db, "users"),
        where("username", "==", newUser.value.username),
        limit(1)
      );

      const querySnapshot = await getDocs(q);
      console.log(querySnapshot.size);
      if (querySnapshot.size == 1) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Username telah ditambahkan sebelumnya!",
        });
        submitForm.value = false;
      } else {
        submitForm.value = true;
        // Add a new document with a generated id.
        const docRef = await addDoc(collection(db, "users"), {
          fullname: newUser.value.fullname,
          username: newUser.value.username,
          password: newUser.value.password,
          avatar: "user.jpg",
          created_at: Date.now(),
        })
          .then((data) => {
            Swal.fire({
              icon: "success",
              title: "Success!",
              text: "Registrasi akun berhasil",
              confirmButtonText: "Ok",
            }).then((result) => {
              if (result.isConfirmed) {
                router.push({ name: "login" });
              }
            });
          })
          .catch((err) => {
            console.log(err);
            Swal.fire({
              icon: "error",
              title: "Terjadi kesalahan...",
              text: "Gagal melakukan registrasi akun",
            });
          })
          .finally(() => {
            submitForm.value = false;
          });
      }
    }
  }
};
</script>

<style></style>
