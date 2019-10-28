<template>
    <!-- <v-container grid-list-xs>
        <v-layout row wrap>
            <v-flex v-for="(post, index) in posts" 
                    :key="post.id"
                    xs12
                    md6
                    xl3
                    pa-2>
                <v-card @click="$router.push({name: 'details', params:{ id:post.id, postProp:posts[index] }})">
                    <v-img height="170"
                           :src="post.image"
                           aspect-ratio="2.75" />
                    <v-card-title primary-title style="padding-top:13px">
                        <div>
                            <h3 class="headline">{{ post.title }}</h3>
                            <div> {{ post.price }}</div>
                            <div> {{ post.dateCreated }}</div>
                        </div>
                    </v-card-title>
                </v-card>
            </v-flex>
        </v-layout>
        <v-btn v-if="isUserAuthenticated"
               @click="$router.push({ name: 'post'})"
               color="red"
               dark
               fixed
               bottom
               right
               fab>
            <v-icon>add</v-icon>
        </v-btn>
    </v-container> -->
    <v-container grid-list-xs>
        <v-layout row wrap>
            <v-flex v-for="post in posts" 
                    :key="post.id"
                    xs12
                    md6
                    xl3
                    pa-2>
                <v-card :loading="loading"
                        class="mx-auto my-6"
                        max-width="374">

                    <!-- <v-img height="250" :src="post.image" /> -->
                    <v-img height="250" 
                           src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                           @click="$router.push({name: 'details', params:{ id:post.id, postProp:posts[index] }})" />

                    <v-card-title>{{ post.title }}</v-card-title>

                    <v-card-text>
                        <v-row
                            align="center"
                            class="mx-0">
                            <v-rating
                            :value="4.5"
                            color="amber"
                            dense
                            half-increments
                            readonly
                            size="14" />

                            <div class="grey--text ml-4">4.5 (413)</div>
                        </v-row>

                        <div class="my-4 subtitle-1 black--text">
                            {{ post.dateCreated }} • Москва, Якиманская набережная д.2
                        </div>

                        <div>
                            Рыбатекст используется дизайнерами, проектировщиками и фронтендерами, 
                            когда нужно быстро заполнить макеты или прототипы содержимым.
                        </div>
                    </v-card-text>

                    <v-divider class="mx-4"></v-divider>

                    <v-card-actions>
                        

                    <v-card-title>{{ post.price }} руб. </v-card-title>
                        <v-spacer />
                        <v-btn icon>
                            <v-icon>mdi-heart</v-icon>
                        </v-btn>
                        <v-btn icon>
                            <v-icon>mdi-share-variant</v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>

        <v-btn v-if="isUserAuthenticated"
               @click="$router.push({ name: 'post'})"
               color="red"
               dark
               fixed
               bottom
               right
               fab>
            <v-icon>add</v-icon>
        </v-btn>

    </v-container>
</template>

<script>
    import firebase from '../configFirebase.js'
    import emptyPhoto from '../assets/no_photo.png'
    export default {
        data(){
            return{
                posts:[],
                loading: false,
                selection: 1,
            }
        },
        mounted() {
            firebase.db.collection('posts').where('actual', '==', true).orderBy('dateCreated', 'desc').onSnapshot((snapShot) => {
                this.posts=[];
                snapShot.forEach((post)  => {

                    let dateObj = new Date(post.data().dateCreated);
                    let date = dateObj.getDate();
                    let month = "0" + dateObj.getMonth();
                    let hours = dateObj.getHours();
                    let minutes = "0" + dateObj.getMinutes();

                    let formattedTime = date + '.' + month.substr(-2) + ' ' + hours + ':' + minutes.substr(-2);

                    this.posts.push({
                        id:post.id,
                        image:post.data().image || emptyPhoto,
                        title:post.data().title,
                        price:post.data().price,
                        dateCreated:formattedTime
                    })
                });
            });
        },
        methods: {
            reserve () {
                this.loading = true

                setTimeout(() => (this.loading = false), 2000)
            },
        },
        computed: {
            isUserAuthenticated() {
                return this.$store.getters.isUserAuthenticated
            }
        }
    }
</script>