<template>
    <v-container grid-list-xs>
        <v-layout>
            <v-flex>
                <v-container fluid style="min-height: 0" grid-list-lg>
                    <croppa v-model="image"
                            :width="350"
                            :height="350"
                            placeholder="Выберите изображение"
                            :placeholder-font-size="0"
                            :disabled="false"
                            :prevent-white-space="false"
                            :show-remove-button="true"
                            @image-remove="onImageRemove"
                            >
                        <img slot="initial" :src="initialImage"/>
                    </croppa>
                </v-container>

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
                                   :disabled="processing"
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
    import firebase from '../configFirebase.js'
    export default {
        props: {
            pictureUrl: {
                default: '',
                type: String
            }
        },
        computed:{
            processing(){
                return this.$store.getters.getProcessing
            }
        },
        data() {
            return {
                image: null,
                title: '',
                comment: '',
                price: '',
                initialImage: ''
            }
        },
        mounted() {
            if (this.$route.params.id) {
                const id = this.$route.params.id
                let me = this;
                this.$store.dispatch('setPost', {id: id}).then(function () {
                        me.initialImage = me.$store.getters.getImage
                        me.title = me.$store.getters.getPostTitle
                        me.comment = me.$store.getters.getComment
                        me.price = me.$store.getters.getPrice
                    }
                )
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
                this.$router.push({name:'home'})
            },
            onImageRemove() {
                this.$store.dispatch('removeImage')
                this.initialImage = null
                this.image.refresh()
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