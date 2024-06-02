<script setup>
import { onMounted, ref } from "vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import PreviewContact from "../components/PreviewContact.vue";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase";
import { useRouter } from "vue-router";

const router = useRouter();

const listContact = ref(null);

onMounted(async () => {
  const q = query(collection(db, "users"));

  const querySnapshot = await getDocs(q);
  console.log(querySnapshot.empty);
  const contact = [];
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    contact.push({ id: doc.id, data: doc.data() });
  });
  listContact.value = contact;
});

const handleContactClick = async (id) => {
  console.log(id);
  const participants = [localStorage.getItem("user"), id];
  console.log(participants);
  const q = query(
    collection(db, "chats_room"),
    where("participants", "array-contains", participants)
  );

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    console.log(doc.data());
  });
  console.log(querySnapshot.empty);
  //   const docRef = await addDoc(collection(db, "users"), {
  //     fullname: newUser.value.fullname,
  //     username: newUser.value.username,
  //     password: newUser.value.password,
  //     avatar: "user.jpg",
  //     created_at: Date.now(),
  //   })
  //     .then((data) => {
  //       console.log(data);
  //       // router.push({ name: "chat-room", params: { id: "asdf" } });
  //       //   Swal.fire({
  //       //     icon: "success",
  //       //     title: "Success!",
  //       //     text: "Registrasi akun berhasil",
  //       //     confirmButtonText: "Ok",
  //       //   }).then((result) => {
  //       //     if (result.isConfirmed) {
  //       //       router.push({ name: "login" });
  //       //     }
  //       //   });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       Swal.fire({
  //         icon: "error",
  //         title: "Terjadi kesalahan...",
  //         text: "Gagal melakukan registrasi akun",
  //       });
  //     })
  //     .finally(() => {
  //       submitForm.value = false;
  //     });
};
</script>

<template>
  <div class="w-96 mx-auto">
    <Header />
    <section id="main" class="border border-slate-300 h-screen relative">
      <h3 class="text-left text-xs font-semibold ml-2 my-2 text-slate-500">
        All Contacts
      </h3>
      <PreviewContact
        @click="handleContactClick(contact.id)"
        :contact="contact"
        v-for="contact in listContact"
        :key="contact.id"
      />
    </section>
    <Footer />
  </div>
</template>
