import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    slides: [
      { title: 'Hallo', complete: false },
      { title: 'Noch einer', complete: true }
    ]
  },
  mutations: {},
  actions: {}
})
