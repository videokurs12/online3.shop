<template>
    <div class="container">
        <div class="row">
            <div class="col-md-6 mt-5 mx-auto">
                <form v-on:submit.prevent="register">
                    <h1 class="h3 mb-3 font-weight-normal">Register</h1>

                    <div class="form-group">
                        <label for="name"> Name</label>
                        <input type="text" @input="changeField('name')" v-model="name" class="form-control" name="name" placeholder="name">
                        <span v-if="errors.name" style="color: red">{{ errors.name[0] }}</span>
                    </div>


                    <div class="form-group">
                        <label for="email"> Email Address</label>
                        <input type="email" v-model="email" class="form-control" name="email" placeholder="Email Address">
                        <span v-if="errors.email" style="color: red">{{ errors.email[0] }}</span>
                    </div>

                    <div class="form-group">
                        <label for="password"> Password</label>
                        <input type="password" v-model="password" class="form-control" name="password" placeholder="Password">
                        <span v-if="errors.password" style="color: red">{{ errors.password[0] }}</span>
                    </div>

                    <div class="form-group">
                        <label for="password_confirmation"> Password</label>
                        <input type="password" v-model="password_confirmation" class="form-control" name="password_confirmation" placeholder="Confirm Password">
                        <!--                        <span v-if="errors.password_confirmation" style="color: red">{{ errors.password_confirmation[0] }}</span>-->
                    </div>

                    <button class="btn btn-lg btn-primary btn-block">Register</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: "Register",
    data(){
        return {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            errors: [],
        }
    },
    methods: {
        register() {
            axios.post('/register',
                {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    password_confirmation: this.password_confirmation,
                })
                .then((res) => {
                    console.log(res)
                })
                .catch((err) => {
                    console.log(err.response.data.errors)
                    if (err.response && err.response.status == 422){
                        this.errors = err.response.data.errors;
                    }
                })
        },
        changeField(name){
            delete this.errors[name];
        }
    }
}
</script>

<style scoped>

</style>

