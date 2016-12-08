import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import messages from './modules/messages/store'

export default new Vuex.Store({
  modules: {
    messages: messages
  }
})