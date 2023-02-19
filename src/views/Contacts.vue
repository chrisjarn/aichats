<template>
  <div id="contacts-view" class="absolute inset-0 flex flex-col">
    <NavBar class="bg-[#F1F1F2] dark:bg-black dark:lg:bg-brown">
      <!-- title -->
      <template #navbar-title>
        <div id="nav-title" class="font-light mt-7  ">
          <div class="flex">
            <Logo />
            <!--<p style="padding-left:1px; margin-bottom: 8px; font-size:9px" >v0.4</p>-->
          </div>
        </div>
      </template>
    </NavBar>
    <!-- contact list -->
    <div
      class="flex-1 bg-white dark:bg-black overflow-y-scroll scrollbar-thin scrollbar-thumb-brown mt-[90px] scrollbar-track-black pb-10 md:pb-0"
    >

      <ul class="grid grid-cols-1 divide-y-[0.5px] dark:divide-y dark:divide-neutral-900 divide-[#C8C8C9]  select-none">
        <!-- contact -->
        <div v-for="(contact_item, id) in contact.list" :key="id">
          <div
            class="contact overflow-hidden cursor-pointer items-center"
            :class="{
              'contact-selected': selectedContact == contact_item.id,
            }"
            @click="openChat(contact_item.id)"
          >
            <div id="contact-image">
              <img
                v-bind="{ src: contact_item.img, alt: contact_item.name }"
                class="object-cover rounded-full w-14 md:w-16 md:h-14"
                :class="{
                  'bg-[#C1F1CB]': contact_item.name.includes('Chris'),
                }"
                alt="user image"
              />
            </div>

      
            <p
              id="contact-name"
              class="overflow-hidden font-SFSemibold w-full text-left text-[18px]"
            >
              {{ contact_item.name}}
              
              <span
                class="font-SFRegular tracking-tight flex  text-[15px] truncateline"
                >{{ chat.getLastMessage(contact_item.id) }}
              </span>
              <span
                class="font-SFRegular tracking-tight text-[#909093] text-[15px] truncateline"
                v-if="chat.getLastMessage(contact_item.id) == ''"
                >{{ contact_item.tagline }}</span
              >
            </p>
          </div>
        </div>
      </ul>
      <!-- <h1 class="mt-10 font-SFRegular">Made with 🫶 by Chris Uttam </h1>
      <p class="text-sm font-SFLight">BETA version 1.0</p> -->
      <DarkMode />
    </div>

  </div>

</template>
<script lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

import chat from "../services/chat";
import contacts from "../services/contacts";

import NavBar from "../components/NavBar.vue";
import Logo from "../components/Logo.vue";

import SettingsButton from "../components/Buttons/SettingsButton.vue";
import HelpButton from "../components/Buttons/HelpButton.vue";
import AddContactButton from "../components/Buttons/AddContactButton.vue";
import BottomSheet from "./BottomSheet.vue";
import DarkMode from "../components/Buttons/DarkMode.vue";

export default {
  name: "Contacts",
  components: {
    Logo,
    NavBar,
    SettingsButton,
    HelpButton,
    AddContactButton,
    BottomSheet,
    DarkMode
},
  props: {
    emitSelected: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["selected"],
  // eslint-disable-next-line
  setup(props, context) {
    const router = useRouter();
    const contact = ref(contacts);
    const selectedContact = ref(null);

    const openChat = (contactId: number): void => {
      if (props.emitSelected) context.emit("selected", contactId);
      else router.push("/chat/" + contactId);
    };
    const openSettings = (): void => {
      router.push("/settings");
    };

    const openAddContact = (): void => {
      router.push("/newcontact");
    };

    const openHelp = (): void => {
      router.push("/help");
    };

    return {
      openChat,
      openSettings,
      openAddContact,
      openHelp,
      contact,
      selectedContact,
      chat,
    };
  },
};
</script>
<style scoped>
.contact {
  @apply flex h-24 p-4  font-SFSemibold leading-5  md:font-normal dark:text-white text-black transition duration-100;
  @apply hover:bg-[#F1F1F2] dark:hover:bg-brown
}

.contact-selected {
  @apply bg-[#007AFF] hover:bg-[#007AFF];
  @apply text-white;
}

/* #contact-image > img {
    @apply rounded-full  shadow-md;
    @apply object-cover w-14 md:w-16 md:h-14;
    @apply bg-white
}    */

.contact > p {
  @apply pt-0 pl-3;
}

.truncateline {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.menu-btn {
  @apply p-2 pt-3 md:p-3 rounded transition duration-100 active:bg-cyan-400 hover:bg-cyan-600 pb-2;
}
</style>
