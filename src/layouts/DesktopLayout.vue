<template>
    <div  id="desktop-layout">
        <div id="box" class="flex bg-black flex-row ">
            <!-- <div class="relative  h-screen border-r-2 border-brown" style="width: 20%">
                <Contacts
                    ref="contactsView"
                    @selected="selected"
                    :emitSelected="true"
                />
            </div> -->
            <div class="relative h-screen  dark:border-brown" style="width: 30%">
                <Contacts
                    ref="contactsView"
                    @selected="selected"
                    :emitSelected="true"
                />
            </div>

            <div ref="box" class="relative border-l-2 dark:border-brown flex-1">
                <Chat
                    v-bind="{ backMode: false, contactId: selectedContact }"
                    :key="selectedContact"
                />
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { nextTick, onBeforeMount, onMounted, ref, watchEffect } from "vue"

import Contacts from "../views/Contacts.vue"
import Chat from "../views/Chat.vue"

export default {
    name: "DesktopLayout",
    components: {
        Contacts,
        Chat,
    },
    // eslint-disable-next-line
    setup() {
        const selectedContact = ref(null)
        const contactsView = ref(null)
        const box = ref(null)
        const selected = (contactId: number): void => {
            selectedContact.value = contactId
            contactsView.value.selectedContact = contactId
        }

        return {
            selected,
            contactsView,
            selectedContact,
            box
        }
    },
}
</script>
<style scoped>

</style>