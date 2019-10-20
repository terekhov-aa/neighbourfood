<template>
    <v-container grid-list-xs>
        <v-layout row wrap>
            <v-flex  v-for="(post, index) in posts" :key="post.id" xs12 md6 xl3 pa-2>
                <v-card @click="$router.push({name: 'details', params:{ id:post.id, postProp:posts[index] }})">
                    <v-img
                            height="170"
                            :src="post.image"
                            aspect-ratio="2.75"
                    ></v-img>
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
        <v-btn v-if="isUserAuthenticated" @click="$router.push({ name: 'post'})"  color="red" dark fixed bottom right fab>
            <v-icon>add</v-icon>
        </v-btn>
    </v-container>
</template>

<script>
    import firebase from '../configFirebase.js'
    export default {
        data(){
            return{
                posts:[]
            }
        },
        mounted(){
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
                        image:post.data().image ,
                        title:post.data().title,
                        price:post.data().price,
                        dateCreated:formattedTime
                    })
                });
            });
        },
        computed: {
            isUserAuthenticated() {
                return this.$store.getters.isUserAuthenticated
            }
        }
    }
</script>