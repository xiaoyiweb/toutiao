import Vue from 'vue'
import Vuex from 'vuex'
import { getUserInfoAPI } from '@/api'
Vue.use(Vuex)
import { delToken, getToken, setToken } from '@/utils/auth'

const store = new Vuex.Store({
    state: {
        token: getToken() || [],
        userInfo: {}
    },
    mutations: {
        setToken(state, token) {
            state.token = token
            setToken(token)
        },
        setUserInfo(state, payload) {
            state.userInfo = payload
        },
        logout(state) {
            delToken()
            state.token = [],
                state.userInfo = {}
        }
    },
    actions: {
        async setUserInfo(context) {
            if (!context.state.userInfo.name) {
                const res = await getUserInfoAPI()
                context.commit('setUserInfo', res.data.data)
            }
        }
    }
})

export default store