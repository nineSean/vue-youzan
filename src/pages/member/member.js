import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [{
  path: '/',
  component: require('./components/member.vue').default
},{
  path: '/address',
  component: require('./components/address.vue').default,
  children: [{
    path: '',
    // component: require('./components/all.vue').default
    redirect: 'all'
  },{
    path: 'all',
    component: require('./components/all.vue').default
  },{
    path: 'form',
    component: require('./components/form.vue').default
  }]
}]
const router = new Router({
  routes
})

new Vue({
  el: '#app',
  router,
})
