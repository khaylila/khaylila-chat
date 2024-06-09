<script setup>
import { nextTick, onMounted, ref, watch } from "vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@/firebase";
import { useRoute } from "vue-router";

// const router = useRouter();
const route = useRoute();

const isLoading = ref(true);
const btnSendDisable = ref(false);

const messages = ref([]);
const messagesUser1 = ref([]);
const messagesUser2 = ref([]);

const headerName = ref("Khaylila-chat");

const userID = ref(localStorage.getItem("user"));

const writeMessage = ref("");

const updateMessages = () => {
  messages.value = [...messagesUser1.value, ...messagesUser2.value];
  messages.value.sort(function (a, b) {
    return a.created_at - b.created_at;
  });
  scrollToBottom();
};

const scrollToBottom = () => {
  nextTick(() => {
    const messageBody = document.getElementById("message-body");
    if (messageBody) {
      messageBody.scrollTop = messageBody.scrollHeight;
    }
  });
};

// Watcher untuk messagesUser1
watch(messagesUser1, () => {
  updateMessages();
});

// Watcher untuk messagesUser2
watch(messagesUser2, () => {
  updateMessages();
});

onMounted(async () => {
  // get users
  const docRef = doc(db, "users", route.params.id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    headerName.value = docSnap.data().fullname;
  } else {
    // docSnap.data() will be undefined in this case
    alert("No such document!");
  }

  const chatFromUser1 = query(
    collection(db, `users/${userID.value}/${route.params.id}`),
    orderBy("created_at", "asc")
  );

  onSnapshot(chatFromUser1, (querySnapshotUser1) => {
    const msg = [];
    querySnapshotUser1.forEach((doc) => {
      msg.push({ ...doc.data(), id: doc.id });
    });
    messagesUser1.value = msg;
  });

  if (userID.value !== route.params.id) {
    const chatFromUser2 = query(
      collection(db, `users/${route.params.id}/${userID.value}`),
      orderBy("created_at", "asc")
    );
    onSnapshot(chatFromUser2, (querySnapshotUser2) => {
      const msg = [];
      querySnapshotUser2.forEach((doc) => {
        msg.push({ ...doc.data(), id: doc.id });
      });
      messagesUser2.value = msg;
    });
  }
  isLoading.value = false;
});

const handleSendMessage = async () => {
  if (writeMessage.value != "") {
    btnSendDisable.value = true;
    try {
      const docRef = await addDoc(
        collection(db, `users/${userID.value}/${route.params.id.trim()}`),
        {
          uid: userID.value,
          message: writeMessage.value,
          created_at: Date.now(),
        }
      );
      writeMessage.value = "";
      console.log(docRef.id);
    } catch (err) {
      alert("Error");
      console.log(err);
    } finally {
      btnSendDisable.value = false;
    }
  }
};

const handleTimestamp = (ts) => {
  const tsNow = Math.floor(Date.now() / 1000);
  ts = Math.floor(ts / 1000);
  const diff = tsNow - ts;
  if (diff < 60) {
    return `${diff} detik yang lalu`;
  } else if (diff < 3600) {
    return `${Math.floor(diff / 60)} menit yang lalu`;
  } else if (diff < 86400) {
    return `${Math.floor(diff / 3600)} jam yang lalu`;
  }

  const date = new Date(ts);
  // Get the last two digits of the year
  const year = String(date.getFullYear());

  // Get the month, padded to two digits
  const month = String(date.getMonth() + 1).padStart(2, "0");

  // Get the day of the month, padded to two digits
  const day = String(date.getDate()).padStart(2, "0");

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  // Combine into the desired format
  return `${year}-${day}-${month} ${hours}:${minutes}:${seconds}`;
};
</script>

<template>
  <div class="w-96 mx-auto">
    <Header type="chat" :name="headerName" />
    <section id="main" class="border border-slate-300 h-screen relative">
      <div
        class="h-full scrollbar-none overflow-y-scroll pb-20"
        id="message-body"
      >
        <template v-if="isLoading">
          <svg
            class="animate-spin mx-auto mt-5 h-20 w-20 text-purple-500"
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
          <template v-for="message in messages" :key="message.id">
            <div
              v-if="message.uid.trim() !== userID"
              class="text-left mx-2 my-3"
            >
              <p class="text-sm p-2 me-8 rounded-md bg-purple-200">
                {{ message.message }}
              </p>
              <p class="text-[8px] mb-1 text-slate-400">
                {{ handleTimestamp(message.created_at) }}
              </p>
            </div>

            <div v-else class="text-right mx-2">
              <p class="text-sm p-2 ms-8 mt-3 rounded-md bg-slate-200">
                {{ message.message }}
              </p>
              <p class="text-[8px] mb-1 text-slate-400">
                {{ handleTimestamp(message.created_at) }}
              </p>
            </div>
          </template>
        </template>
      </div>

      <div
        class="w-full h-20 border-t bg-white border-t-slate-200 absolute bottom-0 p-3"
      >
        <div class="flex flex-row">
          <textarea
            id="message"
            class="block leading-6 text-sm border border-purple-500 w-4/5 rounded-md resize-none p-1"
            rows="2"
            placeholder="Masukkan pesan disini"
            v-model="writeMessage"
          ></textarea>
          <button
            v-if="!btnSendDisable"
            @click="handleSendMessage"
            class="w-1/5 ml-2 bg-purple-500 hover:bg-purple-700 active:bg-purple-900 rounded-md text-white"
          >
            Kirim
          </button>
          <button
            v-else
            class="w-1/5 ml-2 bg-purple-300 rounded-md text-white"
            disabled
          >
            Kirim
          </button>
        </div>
      </div>
    </section>
    <Footer />
  </div>
</template>
