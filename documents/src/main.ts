import './assets/base.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
// import fuckNothing from '@fuck-nothing'; // prod
import fuckNothing from '@fuck-nothing-dev'; // dev

createApp(App).use(createPinia()).use(router).use(fuckNothing).mount('#app');
