<template>
<div v-for="apps in appsData" :key="apps.id">
<div v-if="message.message.includes(apps.id)"  class="dark:text-white text-black w-auto lg:w-[350px] gap-2 dark:bg-[#313131] bg-[#E9E9EB] py-2 px-2 flex rounded-[15px] mt-2 mb-2">
    <img :src="apps.imageSrc" :alt="apps.name" class="rounded-xl object-cover h-12 w-12"/>
    <div class="text-start w-[155px] overflow-hidden">
    <h1 class="font-SFMedium">{{apps.name }}</h1>
    <p class="font-SFRegular  text-sm text-[#3C3C43] dark:text-[#EBEBF5] opacity-[60%]">{{apps.description}}</p>
                      
</div>
<a :href="apps.ahref" class="">
<button class="font-SFSemibold items-center mt-2 translate-x-12 text-sm text-white rounded-full px-3 py-1 h-8 bg-[#0A84FF]">OPEN</button>
</a>
</div>
</div>
                    
    
</template>

<script>

const appsData = [
  {
  id: 'Spotify',
  name: 'Spotify',
  imageSrc: 'https://cdn.jim-nielsen.com/ios/512/spotify-music-2015-07-30.png',
  description: 'App to stream music...',
  ahref: 'https://open.spotify.com/'
 },
 {
  id: 'Netflix',
  name: 'Netflix',
  imageSrc: 'https://cdn.jim-nielsen.com/ios/512/netflix-2018-11-01.png',
  description: 'App to stream shows...',
  ahref: 'https://open.spotify.com/'
 },
 {
  id: 'Facebook',
  name: 'Facebook',
  imageSrc: 'https://cdn.jim-nielsen.com/ios/512/facebook-2019-05-21.png',
  description: 'Social Media App...',
  ahref: 'https://open.spotify.com/'
 },
 {
  id: 'Instagram',
  name: 'Instagram',
  imageSrc: 'https://cdn.jim-nielsen.com/ios/512/instagram-2022-05-19.png',
  description: 'Social Media App...',
  ahref: 'https://open.spotify.com/'
 },
 {
  id: 'Tinder',
  name: 'Tinder',
  imageSrc: 'https://i.pinimg.com/474x/8c/0e/e8/8c0ee86a08f33a9a892a6287d3ea871e.jpg',
  description: 'Dating App...',
  ahref: 'https://oia.bio/jwqv2'
 },
]

export default {
  components: {
  },
  props: {
    message: {
      type: Object
    }
  },
  setup() {
    return {
      appsData,
    }
  },
}

</script>

<style>



</style>