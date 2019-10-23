<template>
    <v-container grid-list-xs>
        <v-layout v-if="loading">
            <v-flex>
                <div id="spinner_container">
                    <v-progress-circular v-if="loading" 
                                         v-bind:size="40" 
                                         indeterminate
                                         color="pink" 
                                         class="spinner" />
                </div>
            </v-flex>
        </v-layout>
        <v-layout v-if="!loading" column>
            <v-flex>
                <v-img :src="image" />
            </v-flex>
            <v-flex>
                <h1>{{ title }}</h1>
                <p class="subtitle">{{ comment }}</p>
                <h3>{{ price }}</h3>
            </v-flex>
        </v-layout>
        <v-bottom-navigation>
            <v-btn @click.prevent="updatePost">
                <span>Редактировать</span>
                <v-icon>create</v-icon>
            </v-btn>
            <v-btn @click.prevent="removePost">
                <span>Удалить</span>
                <v-icon>delete</v-icon>
            </v-btn>
        </v-bottom-navigation>
    </v-container>
</template>

<script>
    import firebase from '../configFirebase.js'

    export default {
        props: {
            postProp: {
                type: Object,
            }
        },
        computed: {
            image() {
                return this.$store.getters.getImage
            },
            title() {
                return this.$store.getters.getPostTitle
            },
            comment() {
                return this.$store.getters.getComment
            },
            price() {
                return this.$store.getters.getPrice
            },
            loading() {
                return this.$store.getters.getProcessing
            }
        },
        methods: {
            removePost() {
                this.$store.dispatch('removePost', {
                    id: this.$route.params.id
                })
            },
            updatePost() {
                this.$router.push({name: `post`, params: {id: this.$route.params.id}})
            }

        },
        data() {
            return {
                post: undefined
            }
        },
        mounted() {
            this.$store.dispatch('setPost', {
                id: this.$route.params.id
            })
        }
    }
</script>

<style scoped>
    #spinner_container {
        text-align: center;
    }

    .spinner {
        margin: auto;
        margin: 4rem;
    }
</style>