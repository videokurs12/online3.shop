<template>
    <div class="container">
        <div class="row">
            <div class="col-md-4 mt-5 mx-auto">
                <form v-on:submit.prevent="login">
                    <h1 class="h3 mb-2 font-weight-bold">Log In</h1>
                    <p class="mb-4">For the purpose of industry regulation, your details are required.</p>

                    <div class="form-group">
                        <label for="email"> Email address</label>
                        <input type="email" v-model="email" class="form-control" name="email" placeholder="Email Address">
                        <span v-if="errors.email" style="color: red">{{ errors.email[0] }}</span>
                    </div>

                    <div class="form-group">
                        <label for="password"> Password</label>
                        <input type="password" v-model="password" class="form-control" name="password" placeholder="Password">
                        <span v-if="errors.password" style="color: red">{{ errors.password[0] }}</span>
                    </div>

                    <button @click="reloadPage" class="btn btn-lg btn-primary btn-block">Sign in</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
// import router from "../router";
import EventBus from '../components/EventBus'
export default {
    name: "Login",
    data(){
        return {
            email: '',
            password: '',
            errors: [],
        }
    },
    methods:{
        login() {
            axios.post('login',
                {
                    email:this.email,
                    password:this.password,
                })
                .then((res) => {
                    localStorage.setItem('usertoken', res.data.token)
                    this.email = ''
                    this.password = ''
                    this.$router.push({path: '/home'})
                    // router.push({name: 'Home'})

                })
                .catch((err) => {
                    console.log(err.response.data.errors)
                    if (err.response && err.response.status == 422) {
                        this.errors = err.response.data.errors;
                    }
                })

            this.emitMethod()
        },

        emitMethod() {
            EventBus.$emit('logged-in','loggedin')
        },
        /*reloadPage() {
            window.location.reload();
        }*/
    }
}
</script>

<style scoped>

</style>

