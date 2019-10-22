<template>
    <v-container bg fill-height grid-list-md text-xs-center>
        <v-layout row wrap align-center>
            <v-flex>
                <button @click.prevent="googleAuth" class="social-button">
                    <img src="../assets/google_plus.png">
                </button>
<!--                <button @click.prevent="googleAuth" class="social-button">-->
<!--                    <img src="../assets/twitter.png">-->
<!--                </button>-->
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import firebase from "firebase";
    export default {
        name: "SocialSign",
        methods: {
            googleAuth() {
                // Using a popup.
                var provider = new firebase.auth.GoogleAuthProvider();
                provider.addScope('profile');
                provider.addScope('email');
                firebase.auth().signInWithPopup(provider).then(function(result) {
                    // This gives you a Google Access Token.
                    var token = result.credential.accessToken;
                    // The signed-in user info.
                    var user = result.user;
                });
            },
            twitterAuth() {
                // Using a popup.


                /**
                 *
                 * now i making app for simple people who want share or sell food to their neighbors, It simple pwa app with back side on firebase. I need to make authorization with different social sites twitter one of them, so i need to add api key and secret api key to firebase
                 * @type {firebase.auth.TwitterAuthProvider}
                 */
                var provider = new firebase.auth.TwitterAuthProvider();
                firebase.auth().signInWithPopup(provider).then(function(result) {
                    // For accessing the Twitter API.
                    var token = result.credential.accessToken;
                    var secret = result.credential.secret;
                    // The signed-in user info.
                    var user = result.user;
                });
            }

        }
    }
</script>

<style scoped>
    .social-button {
        /*position: fixed;*/
        /*top: 50%;*/
        /*left: 50%;*/
        /*transform: translate(-50%, -50%);*/
        /*width: 75px;*/
        /*background: white;*/
        /*padding: 10px;*/
        /*border-radius: 100%;*/
        /*box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);*/
        /*outline: 0;*/
        /*border: 0;*/
    }

    /*.social-button:active {*/
    /*    box-shadow: 0 2px 4px 0 rgba(0,0,0,1);*/
    /*}*/

    .social-button img {
        width: 55px;
        height: 55px;
    }
</style>