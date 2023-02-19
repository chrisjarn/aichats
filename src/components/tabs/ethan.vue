<template>
    <div class="mx-3">
    <h1 class="font-SFRegular ml-2 mt-4 text-center text-[#909093] text-sm">No Questions? Ask Ethan some of these</h1>
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
        title: 'Heading to Bali, write me a 4 day itinerary',
      },
      {
        id: 2,
        title: "Wyd?",
      },
      {
        id: 3,
        title: 'Can you get me a job at FMG?',
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
        id: 5,
        title: "You going jack rabbits this weekend?",
      },
      {
        id: 8,
        title: "Did you enjoy Bali?",
      },
      {
        id: 10,
        title: "Write a very short story about Drake stealing your girl",
      },
      {
        id: 10,
        title: "Net worth of Andrew Twiggy?",
      },
      {
        id: 10,
        title: "You single? 👀 ",
      },
    ]
  </script>
  
<style>

</style>