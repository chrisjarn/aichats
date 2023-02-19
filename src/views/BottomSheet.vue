<template>
        <button @click="open" class="mt-2">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.5065 14.0578C16.6708 14.0578 19.2337 11.3098 19.2337 7.94543C19.2337 4.63242 16.6708 2 13.5065 2C10.3553 2 7.76634 4.67095 7.77942 7.97111C7.7925 11.3226 10.3422 14.0578 13.5065 14.0578ZM13.5065 11.8106C11.7021 11.8106 10.1723 10.1284 10.1723 7.97111C10.1592 5.86517 11.689 4.24719 13.5065 4.24719C15.3371 4.24719 16.8408 5.83949 16.8408 7.94543C16.8408 10.1027 15.324 11.8106 13.5065 11.8106ZM5.34736 26H21.6526C23.9147 26 25 25.2937 25 23.7785C25 20.2472 20.5151 15.5474 13.5065 15.5474C6.49801 15.5474 2 20.2472 2 23.7785C2 25.2937 3.08528 26 5.34736 26ZM4.94201 23.7528C4.6282 23.7528 4.51052 23.6501 4.51052 23.4189C4.51052 21.4543 7.74019 17.7945 13.5065 17.7945C19.2598 17.7945 22.4895 21.4543 22.4895 23.4189C22.4895 23.6501 22.3718 23.7528 22.058 23.7528H4.94201Z" fill="#EBEBF5" fill-opacity="0.6"/>
</svg>
        </button>
    <vue-bottom-sheet  :rounded="true" height="400px"  ref="myBottomSheet" class="myBottomSheet">
      <button @click="close" class=" p-3  bg-[#2C2C2E] rounded-full  absolute right-4 top-4"><svg width="14" height="13" viewBox="0 0 12 11" fill="none"  xmlns="http://www.w3.org/2000/svg">
<path d="M1.04932 9.1811C0.738281 9.49213 0.731934 10.0444 1.05566 10.3681C1.38574 10.6918 1.93799 10.6855 2.24268 10.3808L6.00049 6.62299L9.75195 10.3745C10.0693 10.6918 10.6152 10.6918 10.939 10.3681C11.2627 10.038 11.2627 9.49848 10.9453 9.1811L7.19385 5.42963L10.9453 1.67182C11.2627 1.35444 11.269 0.808539 10.939 0.484808C10.6152 0.161078 10.0693 0.161078 9.75195 0.47846L6.00049 4.22993L2.24268 0.47846C1.93799 0.167425 1.37939 0.15473 1.05566 0.484808C0.731934 0.808539 0.738281 1.36713 1.04932 1.67182L4.80078 5.42963L1.04932 9.1811Z" fill="#EBEBF5" fill-opacity="0.6"/>
</svg>
</button>
        <div class="h-60 bg-[#1C1C1E] text-white">
      <h1 class="text-center mt-10">No clue what to put here, maybe some widgets?</h1>
      <p>
        
      </p>
    </div>
    </vue-bottom-sheet>
  </template>
  
  <script setup>
  import { VueBottomSheet } from "@webzlodimir/vue-bottom-sheet";
  import  "@webzlodimir/vue-bottom-sheet/dist/style.css";
  import { ref } from "vue";
  
  const myBottomSheet = ref(null)
  
  const open = () => {
    myBottomSheet.value.open();
  }
  
  const close = () => {
    myBottomSheet.value.close();
  }
  </script>

  <style>

.bottom-sheet__card {
  background: #1C1C1E;
}

.bottom-sheet__bar {
  background: #1C1C1E;
}

</style>