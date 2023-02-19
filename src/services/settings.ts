import { reactive } from 'vue'
import * as store from "../utils/localStorage";
import defaultSettings from "../utils/defaultSettings";
import { setLang }  from '../services/language'


class SettingsManager {
    values = reactive({})

    loadSettings(){
        let storedSettings = store.read("settings");
        // If settings doesn't exists, so load default settings
        if (storedSettings == null){
          Object.assign(this.values, defaultSettings);
            return true
        }
        // Load stored configurations
        console.info("[+] Loading stored settings")
        Object.assign(this.values, storedSettings);
    }

    saveSettings(){
        console.log("Saving:", this.values)
        store.write("settings", this.values)
    }

    userName = {
        get:()=>{
            return this.values['userProfile']['userName']
        },
        set:(newUserName)=>{
            this.values['userProfile']['userName'] = newUserName;
        }
    }
    
    maxMessages = {
        get:()=>{
            return this.values['maxMessages']
        },
        set:(max : number)=>{
            this.values['maxMessages'].value = max
        }
    }
    language = {
        get:()=>{
            return this.values['lang']
        },
        set:(lang : string)=>{
            this.values['lang'] = lang
        }
    }
}

const settings = new SettingsManager()
settings.loadSettings()

export default settings
