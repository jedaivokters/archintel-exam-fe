import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import AxiosPlugin from './router/apiClient';

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(AxiosPlugin);

import '@fortawesome/fontawesome-free/css/all.css';

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
