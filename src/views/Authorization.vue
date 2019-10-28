<template>
    <v-app id="inspire">
        <v-content>
            <v-container
                    class="fill-height"
                    fluid
            >
                <v-row
                        align="center"
                        justify="center"
                >
                    <v-col
                            cols="12"
                            sm="8"
                            md="6"
                    >
                        <v-card class="elevation-12">
                            <v-toolbar
                                    dark
                                    flat
                            >
                                <v-toolbar-title>Авторизация</v-toolbar-title>
                                <div class="flex-grow-1"></div>
                            </v-toolbar>
                            <v-card-text>
                                <v-alert
                                        :value="Boolean(error)"
                                        type="warning">
                                    {{error}}
                                </v-alert>
                                <v-form>
                                    <v-text-field
                                            label="Login"
                                            name="login"
                                            prepend-icon="person"
                                            type="text"
                                            v-model="email"
                                    ></v-text-field>

                                    <v-text-field
                                            id="password"
                                            label="Password"
                                            name="password"
                                            prepend-icon="lock"
                                            type="password"
                                            v-model="password"
                                    ></v-text-field>
                                </v-form>
                            </v-card-text>
                            <social-sign></social-sign>
                            <v-card-actions>
                                <div class="flex-grow-1"></div>
                                <v-btn
                                        color="red"
                                        @click.prevent="authorization"
                                        :disabled="processing">Войти</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    import SocialSign from "../components/SocialSign";
    export default {
        name: "Authorization",
        components: {SocialSign},
        data(){
            return {
                email: null,
                password: null
            }
        },
        computed:{
            error(){
                return this.$store.getters.getError
            },
            processing(){
                return this.$store.getters.getProcessing
            },
            isUserAuthenticated(){
                return this.$store.getters.isUserAuthenticated
            }
        },
        watch:{
            isUserAuthenticated(val){
                if (val === true){
                    this.$router.push('/');
                }
            }
        },
        methods:{
            authorization(){
                this.$store.dispatch('authorization', {
                    email: this.email,
                    password: this.password
                })
            }
        }
    }
</script>

<style scoped>

</style>