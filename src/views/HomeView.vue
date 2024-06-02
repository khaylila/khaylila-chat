<script setup>
import { onMounted, ref } from "vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import PreviewMessage from "../components/PreviewMessage.vue";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firebase";
import { useRouter } from "vue-router";

const router = useRouter();

const messages = ref(null);

onMounted(async () => {
  // const docRef = await addDoc(
  //   collection(db, `users/WCPpESe6hARdTOIBaNw1/7qBnJriphzqAjYpzsxVh`),
  //   {
  //     message: "Aku dinda",
  //     created_at: Date.now(),
  //   }
  // );
  // console.log(docRef.id);

  // const docRef = doc(db, `users/${localStorage.getItem("user")}`);
  // const docSnap = await getDocs(docRef);
  const q = query(
    collection(
      db,
      `users/${localStorage.getItem("user")}/7qBnJriphzqAjYpzsxVh`
    ),
    orderBy("created_at", "asc")
  );

  const querySnapshot = await getDocs(q);
  console.log(querySnapshot.empty);
  const msg = [];
  querySnapshot.forEach((doc) => {
    // console.log(doc.id, " => ", doc.data());
    msg.push(doc.data());
  });

  const q2 = query(
    collection(
      db,
      `users/7qBnJriphzqAjYpzsxVh/${localStorage.getItem("user")}`
    ),
    orderBy("created_at", "asc")
  );

  const querySnapshot2 = await getDocs(q2);
  console.log(querySnapshot2.empty);
  querySnapshot2.forEach((doc) => {
    // console.log(doc.id, " => ", doc.data());
    msg.push(doc.data());
  });

  console.log(msg);
  msg.sort(function (a, b) {
    return a.created_at - b.created_at;
  });
  console.log(msg);

  // messages.value = msg;

  // if (docSnap.exists()) {
  //   console.log("Document data:", docSnap.data());
  // } else {
  //   // docSnap.data() will be undefined in this case
  //   console.log("No such document!");
  // }

  // const docRef = doc(db, "users", localStorage.getItem("user"));
  // const docSnap = await getDoc(docRef);

  // if (docSnap.exists()) {
  //   console.log("Document data:", docSnap.data());
  // } else {
  //   // docSnap.data() will be undefined in this case
  //   console.log("No such document!");
  // }

  // const q = query(
  //   collection(db, "chats_room"),
  //   where("participants", "array-contains", localStorage.getItem("user"))
  // );

  // const querySnapshot = await getDocs(q);
  // console.log(querySnapshot.empty);
  // querySnapshot.forEach((doc) => {
  //   console.log(doc.id, " => ", doc.data());
  // });
});

const handleAddChat = () => {
  router.push({ name: "home" });
};
</script>

<template>
  <div class="w-96 mx-auto">
    <Header />
    <section id="main" class="border border-slate-300 h-screen relative">
      <PreviewMessage />
      <button
        @click="handleAddChat"
        class="absolute rounded-full bg-purple-500 hover:bg-purple-700 p-2 bottom-5 right-5"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 h-4 fill-white"
          viewBox="0 0 448 512"
        >
          <!-- !Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. -->
          <path
            d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
          />
        </svg>
      </button>
    </section>
    <Footer />
  </div>
</template>
