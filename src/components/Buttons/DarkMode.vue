<!-- <template>

<p>isDark: {{ isDark }}</p>
<button @click="toggleDark()"
class="text-white rounded p-2 bg-red dark:bg-white">
Toggle Dark Mode
</button>

</template>

<script setup>
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)

</script>
 -->

<!-- This example requires Tailwind CSS v2.0+ -->
<template>
    <div class="absolute bottom-4 left-6">
    <div class="mb-1 mt-2">
    <h1 v-if="isDark == true" class="font-SFRegular text-sm">Dark</h1>
    <h1 v-if="isDark !== true" class="font-SFRegular text-sm">Light</h1>
</div>
    <Switch @click="toggleDark()" :class="[!isDark ? 'bg-[#34C759]' : 'bg-[#787880] bg-opacity-[32%]', 'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none ']">
      <span class="sr-only">Use setting</span>
      <span aria-hidden="true" :class="[!isDark ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200']" />
    </Switch>
</div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { Switch } from '@headlessui/vue'
  import { useDark, useToggle } from '@vueuse/core'
  
  const isDark = useDark()
  const toggleDark = useToggle(isDark)
  
  </script>