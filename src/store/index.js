import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import { getToken, setToken } from '@/utils/auth'

const store = new Vuex.Store({
    state: {
        token:getToken() || []
    },
    mutations: {
        setToken(state,token){
            state.token = token
            setToken(token)
        }
    }
})

export default store