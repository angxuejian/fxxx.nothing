import './assets/base.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import fxxxNothing from '@fuck-nothing-dev'; // dev
import '@theme/main.scss';

createApp(App).use(createPinia()).use(router).use(fxxxNothing).mount('#app');
