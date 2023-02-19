import { reactive } from "vue";
import * as store from "../utils/localStorage";
import contacts from "./contacts"

const clearArray = (array) => {
  array.splice(0, array.length)
}

// Empties an object
const clearObject = (object) => {
  Object.entries(object).forEach(idx=>{
    clearArray(object[idx[0]])
  })
}

class Chat {
  messagesCollection = reactive({});
  contacts = null 
  constructor(agenda){
    this.contacts = agenda
  }

    // chat historial
  loadFromStore(){
    const storechatHistory = store.read("chatHistory");
    if (storechatHistory != null) {
      Object.assign(this.messagesCollection, storechatHistory);
    }
  }

  // Get the last message
  getLastMessage(contactId : number) : string {
    let allMessages = this.messagesCollection[contactId]
    if(allMessages){
      let last = allMessages[Object.keys(allMessages).splice(-1)]
      return last?last.message:''
    }
  }

  // Get amount of messages
  getLength(contactId: number): number {
    let allMessages = this.messagesCollection[contactId]
    if(allMessages){
      return Object.keys(allMessages).length
    }
    return 0
  }

  // Clear chat with specific contact
  clearChat(chatId: number): void {
    clearArray(this.messagesCollection[chatId])
    this.saveHistory();
  };


  // Delete all conversations of all contacts
  deleteAllConversations() : void {
    clearObject(this.messagesCollection)
    this.saveHistory() // save clear collection
    console.log("[+] All conversations deleted!");
  }

  getOrCreateChat(chatId: number): Record<string, unknown> {
    if (!this.messagesCollection[chatId]) this.messagesCollection[chatId] = [];
    return this.messagesCollection[chatId];
  };

  // Save chat history into store
  saveHistory() : void {
    store.write("chatHistory", this.messagesCollection);
  }

  addMessage(chatId: number, sender: string, msgText: string): void {
    // push Message into the chat
    this.messagesCollection[chatId].push({
      id: this.messagesCollection[chatId].length,
      message: msgText.trim(),
      from: sender,
      type:msgText[0] === '*' && msgText[msgText.length - 1] === '*'?'action':'normal'
    });
    const currentContact = this.contacts.getContactInfo(chatId)
  
    // Move chat to top of contact list
    if(currentContact){
      const contactIndex = this.contacts.getList().indexOf(currentContact)
      // swap actual top chat
      this.contacts.getList().unshift(this.contacts.getList().splice(contactIndex,1)[0]) 
    }
    this.contacts.saveList()
    this.saveHistory()
  };

  deleteLastMessage(chatId: number): void {
    const chat = this.messagesCollection[chatId];
    if (chat) {
      this.messagesCollection[chatId].pop(chat.length);
    }
    this.saveHistory();
  };
  
}

const chat = new Chat(contacts)
chat.loadFromStore()

export default chat;
