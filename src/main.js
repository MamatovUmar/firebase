import Vue from 'vue'
import App from './App.vue'
import store from './store'

import firebase from './plugins/firebase';
import './plugins/element-ui';
import web3 from './plugins/web3';
import { router } from './plugins/vue-router';

Vue.config.productionTip = false;
Vue.use(web3, { store });

firebase.auth().onAuthStateChanged(async user => {
  if(user) {
    const data = await user.getIdTokenResult();
    store.commit('User/setData', data)
  }
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
});
