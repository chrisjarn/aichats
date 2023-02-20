# AI-LIT
Electron app with menubar utlizing GPT-3. Theme is based on a mixture between iMessage & Insta. Made with Vue, Tailwind. 

## Project setup
```
 - npm install
 - sign up to openAI and retrieve the API key. You'll need to insert this in src/openai/openai.js - const OPENAI_API_KEY = "insert api key here".
 - demo contact name can be changed in democontacts.ts, can also add another contact and multiple chats running. 
```
## Project Run
```
 - npm run build - this will create a dist folder that electron will use to run 
 - npm run electron:start - this will fire up electron and menubar, only the menubar instance will be visible, if you want the electron browser window to be visible. Look in main.js in the root and uncomment createWindow 

```

![Recording 2023-02-20 at 10 01 32](https://user-images.githubusercontent.com/83709354/219992185-98067384-a74c-429a-b457-15984cd5f324.gif)
