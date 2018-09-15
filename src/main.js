import Vue from 'vue';
import App from './App.vue';
import skycon from 'vue-skycon';
import moment from 'moment';

Vue.config.productionTip = false;
Vue.use(moment);
Vue.use(skycon);
new Vue({
  render: h => h(App),
}).$mount('#app');
