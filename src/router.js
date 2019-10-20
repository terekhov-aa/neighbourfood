import Vue from 'vue'
import Router from 'vue-router'
import Store from './store'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ './components/Home.vue')
    },
    {
      path: '/details/:id',
      name: 'details',
      props: true,
      component: () => import(/* webpackChunkName: "details" */ './components/Details.vue')
    },
    {
      path: '/post/:id?',
      name: 'post',
      props: true,
      beforeEnter: AuthGuard,
      component: () => import(/* webpackChunkName: "post" */ './components/Post.vue')
    },
    {
      path: '/camera',
      name: 'camera',
      component: () => import(/* webpackChunkName: "camera" */ './components/Camera.vue')
    },
    {
      path: '/registration',
      name: 'registration',
      component: () => import(/* webpackChunkName: "registration" */ './components/Registration.vue')
    },
    {
      path: '/authorization',
      name: 'authorization',
      component: () => import(/* webpackChunkName: "authorization" */ './components/Authorization.vue')
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