import settings from './settings'
import { reactive  } from 'vue'

let messages = {
    english:{
        advertiseMessage:"Advertence!",
        settings:"Settings",
        startToChat:"Choose someone and start chat!",
        about:"About Keep Talking",
        send:"Send",
        undo:"Undo",
        retry:"Retry",
        keepTalk:"Keep talk",
        emptyChat:"Clear chat",
        writeSomething:"Write something",
        yourName:"Your name",
        openAIKey:"Open AI API Key",
        defaultModel:"Default model",
        deleteAllChats:"Delete chats",
        deleteAllContacts:"Delete contacts",
        deleteAll:"Delete all",
        user:"User",
        reachedLimit:"You've reached the limit. The chat will reset next message ✌️",
        updates:"News!",
        updateMessage:"New version is available",
        reload:"Reload",
        close:"Close",
        addNewContact:"Add new contact",
        contactAdded:"Contact added",
        photo:"Photo",
        description:"Description",
        tags:"Tags",
        done:"Done",
        confirm:"Confirm",
        denyResponse:"Sorry, i cant talk now",
        online:"Online",
        errorToResponse:"Offline (General Error) ⚠️",
        writting:"Typing...",
        selectLang:"Select lang",
        todayIs:"Today is",
        saveToFile:"Save",
        generalTalkAsk:"What would you like to talk about?",
        name:"Name"
    }
}

let text = reactive({})

const setLang = (lang : string)=> {
    Object.assign(text, messages[lang]);
}

const getLang = ()=>{
    return settings.language.get()
}

setLang(getLang())

export { text, setLang, getLang }