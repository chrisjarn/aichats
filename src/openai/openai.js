import { reactive } from "vue"
import { Configuration, OpenAIApi } from "openai";

import * as engines from "../openai/engines.ts"

// const OPENAI_API_KEY = "<YOUR API KEY>"
const OPENAI_API_KEY = "" 
class openaiAPI {
  constructor() {
    this.apiKey = OPENAI_API_KEY
    this.configuration = {
      temperature: 0.7,
      engine: "text-davinci-003"
    }
    this.openai = new OpenAIApi(new Configuration({apiKey:this.apiKey}));
  }

  setApiKey(key) {
    this.apiKey = key
  }

  setEngine(engine) {
    this.configuration.engine = engine
  }

  async chatGen(prompt, userName, botName, engine = null, temperature = null) {
    let stopwords = [userName + ':', botName + ":"]
    let selectedEngine = engine?engine:this.configuration.engine
    let selectedTemperature = temperature? temperature:this.configuration.temperature

    if (!selectedEngine.includes('text-')) stopwords.push("\n")
      console.log("=>Input:", prompt, 
      "\n\n=>Engine:", selectedEngine,
      "\n\n=>Temperature:", selectedTemperature)
      
      const gptResponse = await this.openai.createCompletion({
          model: selectedEngine,
          prompt: prompt,
          max_tokens: 1000,
          temperature: selectedTemperature, // a number between 0 and 1 that determines how many creative risks the engine takes when generating text.
          top_p: 1,
          presence_penalty: 0.0, // a number between 0 and 1. The higher this value the model will make a bigger effort in talking about new topics.
          frequency_penalty: 0.5, // a number between 0 and 1. The higher this value the model will make a bigger effort in not repeating itself.
          best_of: 1,
          n: 1,
          stop: stopwords,
        })

    console.log("=>Output", gptResponse.data.choices[0].text)
    return gptResponse
  }

  loadUserConfiguration() {
    // Get prefered engine
    const userConfig = JSON.parse(localStorage.getItem("openAIConfiguration"))
    if (userConfig) {
      if (userConfig.temperature)
        this.configuration.temperature = userConfig.temperature
      if (userConfig.engine) this.configuration.engine = userConfig.engine
    }else{
      this.configuration.engine = engines.allEngines[engines.defaultEngine]

    }
  }

  saveConfiguration() {
    localStorage.setItem(
      "openAIConfiguration",
      JSON.stringify(this.configuration)
    )
  }
}

const openai = reactive(new openaiAPI())
openai.loadUserConfiguration()

export { openai }
