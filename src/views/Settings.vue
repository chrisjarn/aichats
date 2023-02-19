<template>
<div class="absolute inset-0 flex flex-col">
    <NavBar :showBackButton=true>
        <template #navbar-title>
            <p class="text-2xl font-light justify-self-start ml-2 pt-6">{{ text['settings'] }}</p>
        </template>
    </NavBar>
    <ConfirmDialog ref="dialog"></ConfirmDialog>
    <!--<p style="color:red"> Provisory Settings </p>-->
    <div class="flex-1 pt-2 overflow-y-scroll">
        <label class="text-2xl font-light text-gray-500 select-none" for="username">{{ text['user'] }}:</label><br>
        <input v-model="inputUserName" type="text" id="username" name="username" class="font-monospace p-3 w-4/5 h-12 border border-b-4"><br><br>

        <label class="text-2xl font-light text-gray-500   select-none" for="apikey">{{ text['openAIKey'] }}:</label><br>
        <input v-model="inputApiKey" type="text" id="apikey" name="apikey" class="font-monospace p-3 w-4/5 h-12 border border-b-4"><br><br>
        
        <label class="text-2xl font-light text-gray-500   select-none" for="model">{{ text['defaultModel'] }}</label><br>
        <select v-model="inputActualEngine" class="font-monospace p-3 w-4/5 h-12 border border-b-4" name="model" id="model">
            <option v-for='(label, name, id) in allEngines' :value=label :key=id >{{ name }}</option>
        </select>
        <br>
        <br>
        <label class="text-2xl font-light text-gray-500   select-none" for="model"> {{ text['selectLang'] }}</label><br>
        <select v-model="defaultLang" class="font-monospace p-3 w-4/5 h-12 border border-b-4" name="lang" id="lang">
            <option v-for='(label, lang, id) in allLanguages' :value=label :key=id >{{ lang }}</option>
        </select>
        <br>
        <div v-for="label, name, id in allEngines" :key=id>
        </div>
        <button class="mt-8 object-center transition duration-500 bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-500 text-white font-bold py-2 px-4 border-b-4 border-cyan-700 hover:border-cyan-600 rounded" @click="deleteConversations()">
            {{ text['deleteAllChats'] }}
        </button> 
        <br>
        <button class="mt-1 object-center transition duration-500 bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-500 text-white font-bold py-2 px-4 border-b-4 border-cyan-700 hover:border-cyan-600 rounded" @click="deleteContacts()">
            {{ text['deleteAllContacts'] }}
        </button> 
        <br>
        <button class="mt-1 object-center transition duration-500 bg-red-500 hover:bg-red-400 active:bg-red-500 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded" @click="deleteAllConfiguration()">
            {{ text['deleteAll'] }}
        </button> 
        <br>
        <br>
    </div>
</div>
</template>
<script lang="ts">
import { watchEffect , ref } from 'vue'

import { openai } from '../openai/openai'
import { allEngines as engines } from '../openai/engines'
import { setLang, text } from "../services/language";

import chat from '../services/chat'
import contacts from '../services/contacts'
import settings from '../services/settings'

import NavBar from '../components/NavBar.vue'
import ConfirmDialog from '../components/ConfirmDialog.vue'

export default {
    name:'Settings',
    components:{
        NavBar,
        ConfirmDialog
    },
    setup(){
        const inputApiKey = ref(openai.apiKey)
        const inputActualEngine = ref(openai.configuration.engine)
        const inputUserName = ref(settings.userName.get())
        const defaultLang = ref(settings.language.get())
        const dialog = ref(null)
        const allEngines = engines
        const allLanguages = {"English":"english"}
        
        const deleteConversations = () : void =>{
            dialog.value.show = true
            let confirmDeletion = {
                title:'',
                message: '',
                onaccept: () => {chat.deleteAllConversations();dialog.value.show=false}
            }
            Object.assign(dialog.value.settings, confirmDeletion)
        }

        const deleteContacts = () : void => {
            dialog.value.show = true
            let confirmDeletion = {
                title:'¿Eliminar contactos?',
                message: 'Todos los contactos serán eliminados.',
                onaccept: () => {contacts.deleteAllContacts();dialog.value.show=false}
            }
            Object.assign(dialog.value.settings, confirmDeletion)
        }

        const deleteAllConfiguration = () : void => {
            dialog.value.show = true
            let confirmDeletion = {
                title:'',
                message: '',
                onaccept: () => {
                    // Delete all configurations
                    console.log("All deleted!");
                    chat.deleteAllConversations()
                    contacts.deleteAllContacts()
                    chat.saveHistory()
                    contacts.saveList()
                    dialog.value.show=false
                }
            }
            Object.assign(dialog.value.settings, confirmDeletion)
        }

        watchEffect(()=>{
            openai.setApiKey(inputApiKey.value)
            openai.saveConfiguration()
            setLang(defaultLang.value)
        })
        
        watchEffect(()=>{
            openai.setEngine(inputActualEngine.value)
            openai.saveConfiguration()
        })

        watchEffect(()=>{
            // set name
            settings.userName.set(inputUserName)
            if(inputUserName ==''){
                settings.userName.set("Diego")
            }
            
            // set language
            settings.language.set(defaultLang)
            
            // save all settings
            settings.saveSettings()
        })
        
        return {
            inputUserName,
            inputApiKey,
            inputActualEngine,
            deleteConversations,
            deleteContacts,
            deleteAllConfiguration,
            defaultLang,
            dialog,
            allEngines,
            allLanguages,
            text
        }
    }
}
</script>