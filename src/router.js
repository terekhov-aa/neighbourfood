import Vue from 'vue'
import Router from 'vue-router'
import Store from './store'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ './views/Home.vue')
    },
    {
      path: '/details/:id',
      name: 'details',
      props: true,
      component: () => import(/* webpackChunkName: "details" */ './views/Details.vue')
    },
    {
      path: '/post/:id?',
      name: 'post',
      props: true,
      beforeEnter: AuthGuard,
      component: () => import(/* webpackChunkName: "post" */ './views/Post.vue')
    },
    {
      path: '/registration',
      name: 'registration',
      component: () => import(/* webpackChunkName: "registration" */ './views/Registration.vue')
    },
    {
      path: '/authorization',
      name: 'authorization',
      component: () => import(/* webpackChunkName: "authorization" */ './views/Authorization.vue')
    }
  ]
})

function AuthGuard(from, to, next) {
  if (Store.getters.isUserAuthenticated) {
    next();
  } else {
    next('/registration')
  }
}