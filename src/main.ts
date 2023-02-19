import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import './index.css'
import Vue3linkify from "vue-3-linkify";

console.info("[+] Keep talkin, have fun! by Chris Uttam :-)")

createApp(App)
			.use(router)
			.use(Vue3linkify)
			.mount('#app')
