import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store' 
import axios from 'axios'
import VueAxios from 'vue-axios'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueAxios, axios)


const token = localStorage.getItem('token')
if (token) {
  store.commit('setToken', token)
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

new Vue({
  router,
  store, 
  render: h => h(App)
}).$mount('#app')
