<script setup>
import { onMounted, ref } from "vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import { collection, getDocs, onSnapshot, query } from "firebase/firestore";
import { db } from "@/firebase";
import { useRouter } from "vue-router";
import PreviewContact from "@/components/PreviewContact.vue";

const router = useRouter();

const listContact = ref(null);

const isLoading = ref(true);

// const messages = ref(null);

onMounted(async () => {
  const q = query(collection(db, "users"));
  onSnapshot(q, (querySnapshot) => {
    const contact = [];
    querySnapshot.forEach((doc) => {
      contact.push({ id: doc.id, data: doc.data() });
    });
    listContact.value = contact;
  });

  isLoading.value = false;

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
  // const q = query(
  //   collection(
  //     db,
  //     `users/${localStorage.getItem("user")}/7qBnJriphzqAjYpzsxVh`
  //   ),
  //   orderBy("created_at", "asc")
  // );
  // const querySnapshot = await getDocs(q);
  // console.log(querySnapshot.empty);
  // const msg = [];
  // querySnapshot.forEach((doc) => {
  //   // console.log(doc.id, " => ", doc.data());
  //   msg.push(doc.data());
  // });
  // const q2 = query(
  //   collection(
  //     db,
  //     `users/7qBnJriphzqAjYpzsxVh/${localStorage.getItem("user")}`
  //   ),
  //   orderBy("created_at", "asc")
  // );
  // const querySnapshot2 = await getDocs(q2);
  // console.log(querySnapshot2.empty);
  // querySnapshot2.forEach((doc) => {
  //   // console.log(doc.id, " => ", doc.data());
  //   msg.push(doc.data());
  // });
  // console.log(msg);
  // msg.sort(function (a, b) {
  //   return a.created_at - b.created_at;
  // });
  // console.log(msg);
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

const handleContactClick = async (id) => {
  console.log(id);
  router.push({ name: "chat-room", params: { id: id } });
  // const participants = [localStorage.getItem("user"), id];
  // console.log(participants);
  // const q = query(
  //   collection(db, "chats_room"),
  //   where("participants", "array-contains", participants)
  // );

  // const querySnapshot = await getDocs(q);
  // querySnapshot.forEach((doc) => {
  //   console.log(doc.data());
  // });
  // console.log(querySnapshot.empty);
};
</script>

<template>
  <div class="w-96 mx-auto">
    <Header />
    <section id="main" class="border border-slate-300 h-screen relative">
      <h3 class="text-left text-xs font-semibold ml-2 my-2 text-slate-500">
        All Contacts
      </h3>
      <div
        class="scrollbar-none h-full overflow-y-scroll pb-20"
        id="contact-body"
      >
        <template v-if="isLoading">
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
        </template>
        <template v-else>
          <PreviewContact
            @click="handleContactClick(contact.id)"
            :contact="contact"
            v-for="contact in listContact"
            :key="contact.id"
          />
        </template>
      </div>
    </section>
    <Footer />
  </div>
</template>
