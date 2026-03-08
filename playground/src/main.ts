import { createApp } from 'vue';
import App from './App.vue';
import fuckNothing from 'fuck-nothing'; // prod
// import fuckNothing from '@fuck-nothing-dev' // dev

createApp(App).use(fuckNothing).mount('#app');
