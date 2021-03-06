import Vue from 'vue';
import Vuex from 'vuex';
import modules from './modules';

const debug = process.env.NODE_ENV !== 'production';
Vue.use(Vuex);

export default new Vuex.Store({
  modules,
  strict: debug,
});
