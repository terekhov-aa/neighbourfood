import firebase from "firebase";

export default {
    state: {
        user: {
            isAuthenticated: false,
            uid: null
        }
    },
    mutations: {
        set_user(state, payload) {
            state.user.isAuthenticated = true
            state.user.uid = payload
        },
        unset_user(state) {
            state.user = {
                isAuthenticated: false,
                uid: null
            }
        }
    },
    actions: {
        registration({commit}, payload) {
            commit('set_processing', true)
            commit('clean_error')
            if (!payload.email || !payload.password) {
                commit('set_processing', false)
                commit('set_error', 'Оба поля должны быть заполнены!')
                return;
            }
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(user => {
                    commit('set_processing', false)
                })
                .catch(function (error) {
                    commit('set_processing', false)
                    commit('set_error', error.message)
                });
        },
        authorization({commit}, payload) {
            commit('set_processing', true)
            commit('clean_error')
            if (!payload.email || !payload.password) {
                commit('set_processing', false)
                commit('set_error', 'Оба поля должны быть заполнены!')
                return;
            }
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then(user => {
                    commit('set_processing', false)
                })
                .catch(function (error) {
                    commit('set_processing', false)
                    commit('set_error', error.message)
                });
        },
        signout(){
          firebase.auth().signOut()
        },
        state_changed({commit}, payload) {
            if (payload){
                commit('set_user', payload.uid)
            } else {
                commit('unset_user')
            }
        }
    },
    getters: {
        isUserAuthenticated: (state) => state.user.isAuthenticated,
        getUserId: (state) => state.user.uid
    }
}