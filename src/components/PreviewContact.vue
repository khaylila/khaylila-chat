<template>
  <div
    class="p-3 text-left flex flex-row justify-start items-center hover:bg-slate-200 border-y border-y-purple-300 hover:cursor-pointer"
  >
    <img
      src="../assets/logo.png"
      class="w-7 rounded-full mr-2 border border-slate-400"
      alt="profile"
    />
    <div>
      <div class="flex justify-between items-center">
        <h4 class="font-bold line-clamp-1">{{ contact.data.fullname }}</h4>
      </div>
    </div>
  </div>
</template>

<script setup>
const { contact } = defineProps(["contact"]);
</script>
