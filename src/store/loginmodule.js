import Vue from 'vue'
import Vuex from 'vuex'
import mutationType from './mutationtype.js'
Vue.use(Vuex)
const loginModule = {
    getters: {
        [mutationType.GETKEYSTORE]: (state) => {
            console.log(`取值：${state.keystore}`)
            return state.keystore
        },
        [mutationType.GETLOGINUSERINFO]: (state) => {
            let user = state.LoginUser
            if (user === null) {
                let itemValue = localStorage.getItem('loginuser')
                user = JSON.parse(itemValue)
            }
            return user
        },
        [mutationType.GETUSERINFO]: (state) => {
            let user = state.UserInfo
            if (user === null) {
                let itemValue = localStorage.getItem('userinfo')
                user = JSON.parse(itemValue)
            }
            return user

        }
    },
    state: {
        publishKey: '',
        keystore: '',
        LoginUser: null,
        UserInfo: null
    },
    mutations: {
        [mutationType.SET_KEYSTORE](state, obj) {
            console.log('进入mutation', obj)
            state.keystore = obj
        },
        [mutationType.SET_PUBLISHKEY](state, obj) {
            state.publishKey = obj
        },
        [mutationType.SET_LOGINUSERINFO](state, obj) {
            state.LoginUser = obj
            console.log('user', obj)
            localStorage.setItem('loginuser', JSON.stringify(obj))
        },
        [mutationType.SET_USERINFO](state, obj) {
            state.UserInfo = obj
            localStorage.setItem('userinfo', JSON.stringify(obj))
        }
    },
    actions: {
        [mutationType.SET_KEYSTORE]({ commit }, obj) {
            console.log('进入action', obj)
            commit(mutationType.SET_KEYSTORE, obj)
        },
        [mutationType.SET_PUBLISHKEY]({ commit }, obj) {
            commit(mutationType.SET_PUBLISHKEY, obj)
        },
        [mutationType.SET_LOGINUSERINFO]({ commit }, obj) {
            commit(mutationType.SET_LOGINUSERINFO, obj)
        },
        [mutationType.SET_USERINFO]({ commit }, obj) {
            commit(mutationType.SET_USERINFO, obj)
        }
    }
}
export default loginModule