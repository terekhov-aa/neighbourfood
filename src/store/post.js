import firebase from 'firebase'
import router from "../router";
import store from "../store";

export default {
    state: {
        post: {
            id: '',
            actual: true,
            authorUid: '',
            image: '',
            title: '',
            comment: '',
            price: '',
            dateCreated: ''
        }
    },
    mutations: {
        set_post(state, payload) {
            state.post = {
                id: payload.id,
                actual: payload.actual,
                authorUid: payload.authorUid,
                image: payload.image,
                title: payload.title,
                comment: payload.comment,
                price: payload.price,
                dateCreated: payload.dateCreated
            }
        },/*,
        unset_user(state) {
            state.user = {
                isAuthenticated: false,
                uid: null
            }
        }*/
    },
    actions: {
        createPost({commit}, payload) {
            commit('set_processing', true)
            commit('clean_error')
            firebase.firestore().collection('posts').add(
                {
                    actual: true,
                    authorUid: store.getters.getUserId,
                    image: payload.image,
                    title: payload.title,
                    comment: payload.comment,
                    price: payload.price,
                    dateCreated: new Date().getTime()
                }
            ).then(function () {
                commit('set_processing', false)
                // router.push({ name: `home` })
            })
                .catch(function (error) {
                    commit('set_processing', false)
                    commit('set_error', error.message)
                });
        },
        setPost({commit}, payload) {
            commit('set_processing', true)
            commit('clean_error')
            firebase.firestore().doc(`posts/${payload.id}`).get()
                .then(function(doc) {
                if (doc.exists) {
                    let data = doc.data()
                    data.id = doc.id
                    commit('set_post', data)
                    commit('set_processing', false)
                } else {
                    console.log("No such document!");
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
        },
        removePost({commit}, payload) {
            commit('set_processing', true)
            commit('clean_error')
            let post = firebase.firestore().collection('posts').doc(payload.id);
            return post.update({
                actual: false
            })
                .then(function () {
                    commit('set_processing', false)
                    // router.push({ name: `home` })
                })
                .catch(function (error) {
                    commit('set_processing', false)
                    commit('set_error', error.message)
                });
        },
        updatePost({commit}, payload){
            commit('set_processing', true)
            commit('clean_error')
            let post = firebase.firestore().collection('posts').doc(payload.id);
            delete payload.id
            return post.update(payload)
                .then(function () {
                    commit('set_processing', false)
                    // router.push({ name: `home` })
                })
                .catch(function (error) {
                    commit('set_processing', false)
                    commit('set_error', error.message)
                });
        }
    },
    getters: {
        getId: (state) => state.post.id,
        getActual: (state) => state.post.actual,
        getAuthorId: (state) => state.post.authorUid,
        getImage: (state) => state.post.image,
        getPostTitle: (state) => state.post.title,
        getComment: (state) => state.post.comment,
        getPrice: (state) => state.post.price,
        getDateCreated: (state) => state.post.dateCreated,
        getAllOfPost: (state) => state.post
    }
}