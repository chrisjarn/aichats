<template>
<div class="absolute inset-0 flex flex-col">
  <NavBar :showBackButton=true>
    <template #navbar-title> 
      <p class="flex-none text-2xl font-light justify-self-start mt-6 ml-2"> {{ text.addNewContact }}</p>
    </template>
  </NavBar> 
  <div v-show="confirmationNotification" class="pt-1 rounded-3 select-none">
    <div  class="bg-cyan-100 border-t border-b border-cyan-500 text-cyan-700 px-4 py-3" role="alert">
      <p class="font-bold">{{ text.done }}</p>
      <p class="text-sm"> {{ text.contactAdded }}</p>
    </div>
  </div>
  <div class="flex-1 overflow-y-scroll">
    <form class="mt-3" @submit.prevent="confirmContact()">
      <label class="text-2xl font-light select-none text-gray-500" for="contact-description"> {{ text.photo }}</label><br>
      <input class="border py-3 border-b-4 p-3 placeholder:italic placeholder:text-gray-400 " placeholder="Link de una imagen (no obligatoria)" v-model="contactInfo.img" style="width:80%" name="contact-description"><br>

      <label class="text-2xl font-light text-gray-500  select-none" for="contact-name">{{ text.name }}</label><br>
      <input v-model="contactInfo.name" type="text" id="contact-name" name="contact-name" class="font-monospace p-3 w-4/5 h-12 border border-b-4" placeholder="Toda personas tienen un nombre..." required><br>
      
      <label class="text-2xl font-light select-none text-gray-500" for="contact-description"> {{ text.description }}</label><br>
      <textarea class="border border-b-4 p-2 " placeholder="Algo que diría para iniciar una conversación.." v-model="contactInfo.description" style="width:80%" name="contact-description">
      </textarea>
      <br>
      <div class="mt-4">
        <button class="mt-3 object-center transition duration-500 bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-500 text-white font-bold py-2 px-4 border-b-4 border-cyan-700 hover:border-cyan-500 rounded">
          {{ text.confirm }}
        </button> 
      </div>
      <br>
      </form>
  </div>
</div>
</template>
<script>
import { ref } from 'vue'
import NavBar from '../components/NavBar.vue'
import contacts from '../services/contacts'
import { text } from '../services/language'

export default {
  name:'AddNewContact',
  components:{
    NavBar
  },
  // eslint-disable-next-line
  setup(){
    const confirmationNotification = ref(false)

    const contactInfo = ref({
      name: '',
      description: '',
      tags: '',
      img:''
    })

    const confirmContact = ()=>{
      const newContact = {
        id:contacts.getList().length + 1,
        name:contactInfo.value.name,
        img:contactInfo.value.img?contactInfo.value.img:"/default_contacts/profiles_photos/default.jpg",
        context:contactInfo.value.description
      }
      console.log("Created:", newContact)
      contacts.createContact(newContact)
      confirmationNotification.value = true
      contactInfo.value.name = '' // re
      contactInfo.value.description = ''
    }

    return {
      contactInfo,
      confirmContact,
      confirmationNotification,
      text
    }
  }
}
</script>