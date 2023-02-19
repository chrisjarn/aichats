<template> 
    <div>
      <router-view v-slot="{ Component }">
        <keep-alive>
            <component :is="Component" :key="$route.path"/>
          </keep-alive>
      </router-view>
    </div>
</template>
<script>


export default {
  components:{
  
  },
  setup(){
    return {}
  }
}
</script>
<style>

html.dark {
  color-scheme: dark;
}

html {
  scroll-behavior: smooth;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #98989F;
}

/* Slide effect transition */

.slide-enter-active,
.slide-leave-active {
  transition: all 0.1s ease-out;
}

body {
  @apply bg-white text-black dark:bg-black dark:bg-opacity-0 dark:text-white;
}

.slide-enter-to {
  position: absolute;
  right: 0;
}

.slide-enter-from {
  position: absolute;
  right: -100%;
}

.slide-leave-to {
  position: absolute;
  left: -100%;
}

.slide-leave-from {
  position: absolute;
  left: 0;
}



</style>
