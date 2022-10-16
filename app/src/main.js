import { createApp } from 'vue'
import router from './routes'

import './assets/main.css'

import App from './App.vue'

// setting up the app and router together
createApp(App).use(router).mount('#app');
