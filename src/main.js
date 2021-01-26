import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import "./assets/main.css"
import { auth } from "./firebase/config"
import TheSpinner from "./components/UI/TheSpinner.vue"

let app;

auth.onAuthStateChanged(() => {
    if (!app) {
        app = createApp(App)
            .use(router)
            .component("spinner", TheSpinner)
            .mount('#app')
    }
})

