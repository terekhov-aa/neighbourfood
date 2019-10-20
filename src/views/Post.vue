<template>
    <v-container grid-list-xs>
        <v-layout>
            <v-flex>
                <img :src="this.image"/>
                <v-container fluid style="min-height: 0" grid-list-lg>
                    <v-layout row wrap>
                        <v-flex xs12>
                            <v-text-field v-model="title" name="title" label="Напишите название вашего блюда"
                                          id="title"/>
                            <v-text-field type="number" v-model="price" name="price" label="Цена" id="price"/>
                            <v-text-field v-model="comment" name="comment" label="Коментарий"
                                          hint="Опишите все что считаете важным: контакты, состав, количество"
                                          id="comment"/>
                            <v-btn block color="primary"
                                   @click="post()">
                                Продать еду!
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import axios from 'axios'

    export default {
        props: {
            pictureUrl: {
                default: '',
                type: String
            }
        },
        data() {
            return {
                image: null,
                title: '',
                comment: '',
                price: ''
            }
        },
        mounted() {
            if (this.$route.params.id) {
                const id = this.$route.params.id
                let me = this;

                this.$store.dispatch('setPost', {id: id}).then(function () {
                        me.image = me.$store.getters.getImage
                        me.title = me.$store.getters.getPostTitle
                        me.comment = me.$store.getters.getComment
                        me.price = me.$store.getters.getPrice
                    }
                )
            } else {
                if (this.pictureUrl !== '') {
                    this.image = this.pictureUrl;
                    this.loading = false;
                } else {
                    axios.get('https://dog.ceo/api/breed/appenzeller/images/random').then(response => {
                        if (response.data.status) {
                            this.image = response.data.message;
                            this.loading = false;
                        } else {
                            console.log("Error getting image")
                        }
                    })
                }
            }
        },
        methods: {
            post() {
                let data = {
                    image: this.image,
                    title: this.title,
                    comment: this.comment,
                    price: this.price
                }
                if (this.$route.params.id) {
                    data.id = this.$route.params.id
                    this.$store.dispatch('updatePost', data)
                } else {
                    this.$store.dispatch('createPost', data)
                }
            }
        }
    }
</script>

<style scoped>
    img {
        max-width: 100%;
        height: auto;
        width: auto \9;
        /* ie8 */
    }
</style>