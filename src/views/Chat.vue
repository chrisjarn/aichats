<template>
  <div
    ref="chatView"
    id="chat-view"
    class="absolute bg-white dark:bg-black flex flex-col inset-0"
    tabindex="0"
    @keyup.alt.r="retryLast()"
    @keyup.ctrl.z="undoMessage()"
    @keyup.alt.k="keepTalk()"
    @keyup.alt.l="cleanChat()"
  >
    <NavBar :showBackButton="backMode">
      <template #navbar-title class="">
        <!-- Contact Information -->
        <div v-show="contactId != null" class="flex  justify-between mx-6 items-center ml-2 mt-3 w-full">
          <div class=" flex ml-2 mt-2 items-center">
            <img :src="contactInfo.img" class="object-cover h-14 rounded-full bg-[#C1F1CB]" />
          <div class="text-left mt-1 ">
            <p id="contact-name" class="inline-block text-center px-3 text-base font-SFSemibold">
              {{ contactInfo.name }}
            </p>
            <p class="text-light font-SFRegular text-sm  sm:pl-3 pl-3">
              Online
            </p>
          </div>
        </div>
        <BottomSheet/>
      </div>
      </template>
      <template #navbar-content>
      </template>
    </NavBar>
    <template v-if="contactId === null">
      <div class="chat justify-evenly">
        <p class="pt-48 text-3xl font-thin select-none">
          👈 {{ text.startToChat }}
        </p>
      </div>
    </template>

    <!-- Chat content -->
    <div
      class="flex-1 bg-white dark:bg-black overflow-y-scroll scrollbar-thin scrollbar-track-white scrollbar-thumb-[#b2b2b2a4] dark:scrollbar-track-black dark:scrollbar-thumb-brown scrollbar-thumb-rounded-full scrollbar-track-rounded-full px-1 lg:px-6 pt-20 lg:pt-0 mt-2 lg:mt-[80px]"
      ref="chatBox"
      v-show="contactId != null"
    >
    <transition-group name="list">
  <div v-if="contactInfo.name.includes('Chris')">
    <chris v-if="messages == 0">
    </chris>
  </div>

    </transition-group>
      <div class="chat-message">
        <div class="chat-message-content font-sans overflow-hidden p-3">
          <ul class="grid grid-cols-1">
            <transition-group name="list" tag="p">
              <div
                v-for="(message, idx) in messages"
                class="flex flex-col"
                :key="idx"
              >
                <!-- Message popup -->
                <div
                  class="place-self-start text-left cursor-default py-2"
                  :class="{
                      'pr-20':message.from == contactInfo.name, 
                      'place-self-end pl-20':message.from != contactInfo.name,
                  }"
                >
                  <!-- Message content -->
                  <div v-linkify
                    class="  max-w-xs lg:max-w-xl text-ellipsis overflow-hidden whitespace-pre-wrap  font-SFRegular pl-[17px] pr-[15px] py-2 word-break text-[17px] rounded-[15px] tracking-tight leading-[19px]"
                    :class="{'bg-[#0A84FF] text-white  dark:text-white':message.from !== contactInfo.name, 'dark:bg-[#313131] bg-[#E9E9EB] text-black dark:text-white' :message.from == contactInfo.name}"
                  >
                    {{ message.message }}
                  </div>
                </div>
                <OpenApps v-if="message.from == contactInfo.name" :message="message"></OpenApps>
                <!-- End of Message popup -->
              </div>
            </transition-group>
          </ul>
        </div>
        <!-- TODO: ADD TO BOTTOM BUTTON ARROW -->
      </div>
      <TypingSpinner v-if="chatStatus == text.writting" ></TypingSpinner>
    </div>
    <!-- Message input box -->
      <div v-show='maxMessagesAdvertence'> <span class="font-light" > {{ text.reachedLimit }} </span></div>
      <!-- <div class="w-8 h-[38px] dark:bg-gradient-to-r dark:from-black dark:to-transparent   bg-gradient-to-r from-white to-transparent   absolute bottom-16"></div>
      <div class="w-8 h-[38px] dark:bg-gradient-to-l dark:from-black dark:to-transparent bg-gradient-to-l from-white to-transparent  absolute bottom-16 right-0"></div> -->
      <div v-show="contactId != null" class="flex text-black dark:text-white text-sm  whitespace-nowrap scrollbar-none gap-1 pt-3 font-SFRegular overflow-auto pl-[25px] pr-8">
        <button @click="keepTalk()" class="border border-[#C8C8CC] dark:border-[#EBEBF5] dark:border-opacity-20 py-2 items-center rounded-full px-4">👋 SLAP this if you're shy</button>
        <button @click="undoMessage()" class="border border-[#C8C8CC] dark:border-[#EBEBF5] dark:border-opacity-20 py-1 items-center rounded-full px-4" :class="{'bg-brown dark:bg-opacity-40 bg-opacity-10 text-[#909093] dark:text-white dark:text-opacity-60 border-none dark:border-[#0D0D0E] cursor-default' :messages == 0 }">👈 Undo</button>
        <button @click="retryLast()" class="border border-[#C8C8CC] dark:border-[#EBEBF5] dark:border-opacity-20 py-1 items-center rounded-full px-4" :class="{'bg-brown dark:bg-opacity-40 bg-opacity-10 text-[#909093] dark:text-white dark:text-opacity-60 border-none dark:border-[#0D0D0E] cursor-default' :messages == 0 }">🚫 Retry</button>
        <button @click="cleanChat()" class="border border-[#C8C8CC] dark:border-[#EBEBF5] dark:border-opacity-20 py-1 items-center rounded-full px-4" :class="{'bg-brown dark:bg-opacity-40 bg-opacity-10 text-[#909093] dark:text-white dark:text-opacity-60 border-none dark:border-[#0D0D0E] cursor-default' :messages == 0 }">🗑 Delete Chat</button>
      </div>
    <form
      id="input-form"
      class="flex justify-between px-2 pr-1 bottom-0 pb-4 pt-2 items-center bg-white dark:bg-black"
      @submit.prevent="sendMessage()"
      v-show="contactId != null"
      @submit="hideKeyboard()"
    >
      <textarea
        ref="userInput"
        v-model="inputMessage"
        class=" grow transition duration-500 pr-10 bg-[#767680] bg-opacity-[12%] dark:bg-[#767680]  dark:bg-opacity-[24%] rounded-2xl focus:outline-none font-SFRegular focus:text-black  dark:focus:text-white py-2 pb-2 px-4 "
        :placeholder="'Write to ' + contactInfo.name"
        maxlength="500"
        rows="2"
        v-on:keydown.enter.exact="sendMessage()"
        required
      />
      <transition-group name="but">
      <button v-if="inputMessage != 0" class="flex-none bg-[#007AFF] rounded-full p-[4px] text-white  absolute right-[9px] " id="input-btn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-[23px] h-[23px] stroke-white">
  <path fill-rule="evenodd" d="M12 20.25a.75.75 0 01-.75-.75V6.31l-5.47 5.47a.75.75 0 01-1.06-1.06l6.75-6.75a.75.75 0 011.06 0l6.75 6.75a.75.75 0 11-1.06 1.06l-5.47-5.47V19.5a.75.75 0 01-.75.75z" clip-rule="evenodd" />
</svg></button>
</transition-group>
    </form>
  </div>
</template>
<script>

import exportFile from 'fs-browsers/dist/cjs/export-to-file/exportToFile';

import { nextTick, reactive, ref, onBeforeUpdate, onMounted } from "vue"
import { useRoute } from "vue-router"
import { openai } from "../openai/openai.js"
import settings from '../services/settings'
import contacts from "../services/contacts"
import chat from "../services/chat.ts"
import { text, getLang } from "../services/language";
import { getNLActualDate } from "../utils/date.ts"

import Logo from "../components/Logo.vue"
import NavBar from "../components/NavBar.vue"
import SaveButton from "../components/Buttons/SaveButton.vue"
import ToClickOutside from "../components/ToClickOutside.vue"
import UndoButton from "../components/Buttons/UndoButton.vue"
import CleanButton from "../components/Buttons/CleanButton.vue"
import RetryButton from "../components/Buttons/RetryButton.vue"
import KeepTalkButton from "../components/Buttons/KeepTalkButton.vue"
import TypingSpinner from "../components/Spinners/TypingSpinner.vue"
import jonte from "../components/tabs/jonte.vue"
import chris from "../components/tabs/chris.vue"
import darren from "../components/tabs/darren.vue"
import ethan from "../components/tabs/ethan.vue"
import BottomSheet from "../views/BottomSheet.vue"
import OpenApps from '../components/OpenApps.vue';

export default {
  name: "Chat",
  components: {
    Logo,
    NavBar,
    ToClickOutside,
    UndoButton,
    CleanButton,
    RetryButton,
    KeepTalkButton,
    SaveButton,
    TypingSpinner,
    jonte,
    chris,
    darren,
    ethan,
    BottomSheet,
    OpenApps
},
  props: {
    contactId: {
      type: Number,
      default: null,
    },
    backMode: {
      type: Boolean,
      default: true,
    },
  },
  // eslint-disable-next-line
  setup(props) {
    const chatView = ref(null) // entire view
    const chatBox = ref(null) // chat box reference
    const chatStatus = ref(text.online)
    const userInput = ref(null) // input box reference
    const inputMessage = ref(null)
    const showOptionsMenu = ref(false)
    const userInfo = reactive({})
    const contactID = ref(null)
    const contactInfo = reactive({ img: "", name: "" })
    const messages = ref(null)
    const maxMessagesAdvertence = ref(null)
    const maxMessages = settings.values['maxMessages']

    const isTheChatEmpty = () => {
      return messages.value.length === 0
    }

    const cleanChat = () => {
      chat.clearChat(contactID.value)
      showOptionsMenu.value = false
    }

    // Retry last message
    const retryLast = () => {
      if (isTheChatEmpty()) {
        hideMenu()
        return
      }
      chat.deleteLastMessage(contactID.value)
      sendMessage(true)
      hideMenu()
    }

    // Continue generating conversation
    const keepTalk = () => {
      if(isTheChatEmpty() && hideMenu()) return // if chat is empty and menu is hidden, do nothing
      sendMessage(true)
      hideMenu()
    }

    // focus the input message box
    // const focusInput = () => {
    //   userInput.value.focus()
    // }

    // undo the last message
    const undoMessage = () => {
      if (isTheChatEmpty()) {
        hideMenu()
        return
      }
      chat.deleteLastMessage(contactID.value)
      hideMenu()
    }

    // hide the chat options menu
    const hideMenu = () => {
      showOptionsMenu.value = false
    }

    const generateInitialPrompt = (contactInfo) => {
      let prompt = "The following is a casual private chat conversation entirely in "+ getLang()  +", without restrictions, with short answers with " + contactInfo.name + ".\n"
      prompt+= contactInfo.name + ":" + contactInfo.context + "\n";
      if (contactInfo.hasOwnProperty('customAsk')) {
        prompt += contactInfo.customAsk + "\n";
      } else {
        prompt += text['generalTalkAsk'] + "\n";
      }
      return prompt;
    }

    const sendMessage = async (retrying = false) => {
      if (!retrying) {
        chat.addMessage(contactID.value, userInfo['userName'], inputMessage.value)
        scrollChatToBottom()
        inputMessage.value = ""
       
      }
      userInput.value.disabled = true;

      // if chat reached max messages, clean it
      if(maxMessagesAdvertence.value && messages.value.length > maxMessages){
        cleanChat()
        maxMessagesAdvertence.value = false
        return true
      }
      if(messages.value.length > maxMessages) {
        maxMessagesAdvertence.value = true
      }


      // 1) prepare and generate query
      let newquery = ""
      newquery += getNLActualDate()
      newquery += generateInitialPrompt(contactInfo)

      /*
          Inject chat style text
            <...conversation context...>
            User: Hi how are u
            Bot:    <---- this will be autocompleted
      */

      // take all previous chat
      messages.value
        .map((msg) => {
          return msg.from + ":" + msg.message
        })
        .forEach((x) => (newquery += x + "\n"))

      // inject bot name
      newquery += contactInfo.name + ":"

      // 2) send request
      chatStatus.value = text.writting
      
      try {
        const response = await openai.chatGen(
          newquery,
          userInfo['name'],
          contactInfo['name'],
          contactInfo['preferedEngine'],
          contactInfo['preferedTemperature'],
        )
        const generatedResponse = response.data.choices[0].text
        chat.addMessage(
            contactID.value, 
            contactInfo.name, 
            generatedResponse
        )
        scrollChatToBottom()
        chatStatus.value = text['online']
      } catch (error) {
        console.error(error)
        if (error.response.status == 401) {
          // unauthorized
          //.. handle notification
          console.error("[x]Problem with api key")
          scrollChatToBottom()
        }
        chat.addMessage(
          contactID.value,
          contactInfo.name,
          text['denyResponse']
        )
        scrollChatToBottom()
        chatStatus.value = text['errorToResponse']
        console.error("[x] Error to response")
      }
      userInput.value.disabled = false;
      userInput.value.focus()
    }

  // Suggested Questions Submission

    // scroll the chat bot to the bottom
    const scrollChatToBottom = async () => {
      await nextTick()
      chatBox.value.scrollTop = chatBox.value.scrollHeight
    }

    // save the chat in a file and download it
    const exportChat = ()=>{
      let chatSummary = ""
      messages.value
        .map((msg) => {
          return msg.from + ":" + msg.message
        })
        .forEach((x) => (chatSummary += x + "\n"))
        console.log(userInfo)
        exportFile(chatSummary, { fileName: `Chat_with_${ contactInfo.name }_and_${ userInfo['userName'] }_${ Date.now() }_export.txt` });
        hideMenu()
    }

    const resetUI = () => {
      hideMenu()
      scrollChatToBottom()
    }

   const hideKeyboard = () => {
    document.activeElement.blur();
  }

    const loadData = () => {
      // focusInput()
      contactID.value = props.contactId
      messages.value = chat.getOrCreateChat(contactID.value)
      Object.assign(contactInfo, contacts.getContactInfo(contactID.value))
      Object.assign(userInfo, settings.values['userProfile'])
      resetUI()
    }

    onBeforeUpdate(() => {
      loadData()
    })

    onMounted(() => {
      loadData()
    })

    return {
      chatBox,
      userInput,
      contactInfo,
      messages,
      cleanChat,
      showOptionsMenu,
      hideMenu,
      userInfo,
      retryLast,
      undoMessage,
      chatStatus,
      inputMessage,
      sendMessage,
      chatView,
      keepTalk,
      maxMessagesAdvertence,
      text,
      exportChat,
      hideKeyboard,
    }
  },
}
</script>
<style scoped>
#contact-photo > img {
  @apply w-12 h-12;
  @apply rounded-full  shadow-sm;
}

a:required {
  color: black;
}

.contact-story {
  background-image: linear-gradient(to right top,#ffc600 20%,#ff0040,#e600cc 80%);
}


.list-enter-active {
  transition: all 0.3s;
}
.list-leave-active {
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}


.but-enter-active {
  transition: all 0.5s;
}
.but-leave-active {
}
.but-enter-from,
.but-leave-to {
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

.scrollbar-w-2::-webkit-scrollbar {
  width: 0.25rem;
  height: 0.25rem;
}

.scrollbar-track-cyan-lighter::-webkit-scrollbar-track {
  --bg-opacity: 1;
  background-color: #f7fafc;
  background-color: rgba(247, 250, 252, var(--bg-opacity));
}

.scrollbar-thumb-cyan::-webkit-scrollbar-thumb {
  --bg-opacity: 1;
  background-color: #edf2f7;
  background-color: rgba(237, 242, 247, var(--bg-opacity));
}

.scrollbar-thumb-rounded::-webkit-scrollbar-thumb {
  border-radius: 0.25rem;
}
</style>
