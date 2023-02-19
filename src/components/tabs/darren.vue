<template>
    <div class="mx-3">
    <h1 class="font-SFRegular ml-2 mt-4 text-center text-[#909093] text-sm">No Questions? Ask Darren some of these</h1>
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
        id: 2,
        title: "Write me a career objective for being a loose unit?",
      },
      {
        id: 3,
        title: 'How to ask for more $$ at work?',
      },
      {
        id: 4,
        title: "Best bank in australia?",
      },
      {
        id: 5,
        title: "What are my repayments on a 660k loan, 30 years, 101% interest",
      },
      {
        id: 6,
        title: "How to reject a girl (politely)",
      },
      {
        id: 7,
        title: "Write me a 7 day iternary when visiting Taiwan",
      },
      {
        id: 10,
        title: "Travis Scott vs Kanye, who you like?",
      },
      {
        id: 10,
        title: "What is a wraith pact in dota 2?",
      },
      {
        id: 10,
        title: "You single?",
      },
    ]
  </script>
  
<style>

</style>