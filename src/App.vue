<template>
    <v-app>
        <v-app-bar app style="z-index: 100500">
            <v-btn
                    icon v-if="$route.name !== 'home'"
                    @click="$router.go(-1) "
            >
                <v-icon>arrow_back</v-icon>
            </v-btn>
            <v-toolbar-title>
                <span  @click="$router.push({name:'home'})" :style="{ cursor: 'pointer'}">NeighborFood</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon v-if="!isUserAuthenticated">
                <v-icon @click="$router.push({name:'registration'})">account_box</v-icon>
            </v-btn>
            <v-btn icon v-if="!isUserAuthenticated">
                <v-icon @click="$router.push({name:'authorization'})">vpn_key</v-icon>
            </v-btn>
            <v-btn icon v-if="isUserAuthenticated">
                <v-icon @click.prevent="signout">exit_to_app</v-icon>
            </v-btn>
        </v-app-bar>

        <v-content>
            <router-view></router-view>
        </v-content>
    </v-app>
</template>

<script>
    import Home from './views/Home'

    export default {
        name: 'App',
        components: {
            Home
        },
        computed: {
            isUserAuthenticated() {
                return this.$store.getters.isUserAuthenticated
            }
        },
        data() {
            return {
                //
            }
        },
        methods: {
            signout() {
                this.$store.dispatch('signout')
            }
        }
    }
</script>