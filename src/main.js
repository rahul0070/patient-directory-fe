import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import GoogleAuth from 'vue-gapi'

const gauthOption = {
    clientId: '802692104431-nnmjavb8l1kkuspn9sm1efsilhvej35b.apps.googleusercontent.com',
    scope: 'https://www.googleapis.com/auth/userinfo.email'
}

createApp(App).use(GoogleAuth, gauthOption).use(store).use(router).mount('#app')