import { createRouter, createWebHashHistory } from 'vue-router'

import Chat from '../views/Chat.vue'
import Settings from '../views/Settings.vue'
import AddContact from '../views/AddContact.vue'
import Help from '../views/Help.vue'
import Switch from '../views/Switch.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
  
  {
    path: '/',
    name: 'Switch',
    component: Switch
  },
  {
    path: '/chat/:contactId',
    name: 'ChatRoom',
    component: Chat,
    props: true,
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  },
  {
    path: '/newcontact',
    name: 'AddContact',
    component: AddContact
  },
  {
    path: '/help',
    name: 'Help',
    component: Help
  },
]
})


export default router
