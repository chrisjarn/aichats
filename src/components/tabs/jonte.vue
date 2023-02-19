<template>
    <div class="mx-3">
    <h1 class="font-SFRegular ml-2 mt-4 text-center text-[#909093] text-sm">No Questions? Ask Jonte some of these</h1>
    <div class="flex gap-2 mt-2  flex-wrap">
<div v-for="questions in categories" :key="questions.title" class="flex overflow-auto ">
  <div class="border text-black bg-[#E9E9EB] dark:text-white dark:bg-brown border-none  rounded-full text-left font-SFRegular px-4 py-[6px] text-sm ">
    <button class="buttons">{{questions.title}}</button>
</div>
</div>
    </div>
</div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const categories = [
      {
        id: 1,
        title: 'Does drinking coffee make you smarter?',
      },
      {
        id: 2,
        title: "Wyd?",
      },
      {
        id: 3,
        title: 'Write me a poem!',
      },
      {
        id: 4,
        title: "Where you from?",
      },
      {
        id: 5,
        title: "Write me tinder bio",
      },
      {
        id: 6,
        title: "How to reject a girl (politely)",
      },
      {
        id: 7,
        title: "Perth VS Melbourne",
      },
      {
        id: 8,
        title: "Did you enjoy Bali?",
      },
      {
        id: 9,
        title: "Does 9+10 = 21?",
      },
      {
        id: 9,
        title: "You're the best looking ginger ive seen!",
      },
      {
        id: 10,
        title: "Travis Scott vs ASAP Rocky, who you got?",
      },
      {
        id: 10,
        title: "Net worth of Elon?",
      },
    ]
  </script>
  
<style>

</style>