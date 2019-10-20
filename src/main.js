import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import vuetify from './plugins/vuetify';
import store from './store'
import firebase from "firebase";
import 'material-design-icons-iconfont/dist/material-design-icons.css'


Vue.config.productionTip = false

new Vue({
  created(){
    let me = this;
    firebase.auth().onAuthStateChanged(function(user) {
      me.$store.dispatch('state_changed', user)
    });
  },
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
