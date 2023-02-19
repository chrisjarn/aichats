<template>
  <div v-if="offlineReady || needRefresh">
    <ConfirmDialog ref="dialog"></ConfirmDialog>
  </div>
</template>
<script lang="ts">
import { ref, onMounted } from "vue";
import { useRegisterSW } from "virtual:pwa-register/vue";
const { updateServiceWorker } = useRegisterSW();

import ConfirmDialog from '../components/ConfirmDialog.vue'

import chat from '../services/chat'
import contacts from '../services/contacts'
import { text } from '../services/language'



export default {
  name: "ReloadPrompt",
  components:{
    ConfirmDialog
  },
  setup() {
    const dialog = ref(null)
    const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW();

    const close = async () : Promise<void> => {
      offlineReady.value = false;
      needRefresh.value = false;
    }

    const updateSW = async () : Promise<void> => {
      chat.deleteAllConversations()
      contacts.deleteAllContacts()
      chat.saveHistory()
      contacts.saveList()

      await updateServiceWorker();
    }

    const check = () : void => {
      if(offlineReady || needRefresh ){
        dialog.value.show = true 
        dialog.value.type = "success"
        let confirmReload = {
            title: text['updateMessage'],
            message: text['updateMessage'],
            confirmationLabel: text['confirm'],
            abortLabel: text['close'],
            onaccept: () => {updateSW();dialog.value.show=false},
            onabort: ()=>{close();dialog.value.show=false}
        }
        Object.assign(dialog.value.settings, confirmReload)
      }
    }

    onMounted(()=>{setTimeout(()=>{check()},2000)})

    return { offlineReady, needRefresh, updateServiceWorker, close, dialog };
  }
}
</script>