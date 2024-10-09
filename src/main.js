import { createApp } from 'vue'
import App from './App.vue'
import VueLazyload from 'vue-lazyload';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


createApp(App).use(VueLazyload,{ preLoad: 1.3,}).mount('#app')

