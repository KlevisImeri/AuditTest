import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faTrash);

const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon);

app.use(router)

app.mount('#app')
