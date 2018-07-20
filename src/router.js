import Vue from 'vue'
import Router from 'vue-router'
import Automerge from './views/Automerge.vue'
import Kinto from './views/Kinto.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/automerge',
      component: Automerge
    },
    {
      path: '/kinto',
      component: Kinto
    }
  ]
})
