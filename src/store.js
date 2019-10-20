import Vue from 'vue'
import Vuex from 'vuex'
import userModule from './store/user'
import generalModule from "./store/general";
import postModule from './store/post'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        generalModule,
        userModule,
        postModule
    }
})