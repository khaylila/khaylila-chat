<script setup>
import { onMounted, ref } from "vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";

const isLoading = ref(true);

const userData = ref({
  username: "",
  fullname: "",
});

onMounted(async () => {
  const docRef = doc(db, "users", localStorage.getItem("user"));
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    userData.value = { id: docSnap.id, ...docSnap.data() };
  } else {
    alert("No such document!");
  }

  isLoading.value = false;
});
</script>

<template>
  <div class="w-96 mx-auto">
    <Header type="chat" name="User Profile" />
    <section id="main" class="border border-slate-300 h-screen relative">
      <h3 class="text-left text-xs font-semibold ml-2 my-2 text-slate-500">
        User Profile
      </h3>
      <div
        v-if="!isLoading"
        class="scrollbar-none h-full overflow-y-scroll pb-20"
      >
        <img
          src="../assets/logo.png"
          class="mx-auto rounded-full border border-slate-300"
          alt="Profile"
        />
        <div class="mx-4 mt-2">
          <div class="mb-4">
            <label
              class="text-left block text-slate-700 text-sm font-bold mb-2"
              for="fullname"
            >
              Fullname
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="fullname"
              type="text"
              placeholder="fullname"
              v-model="userData.fullname"
              readonly
            />
          </div>
          <div class="mb-4">
            <label
              class="text-left block text-slate-700 text-sm font-bold mb-2"
              for="username"
            >
              Username
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              v-model="userData.username"
              readonly
            />
          </div>
        </div>
      </div>
      <div v-else>
        <svg
          class="animate-spin mx-auto h-20 w-20 text-purple-500"
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
      </div>
    </section>
    <Footer />
  </div>
</template>
