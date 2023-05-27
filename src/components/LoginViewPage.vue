<template>
    <div class="login container">
        <div class="row">
            <div class="col-md-6">
                <img :src="require('@/assets/Logos.png')" alt="Some descriptive text" class="img-fluid">
            </div>
            <div class="col-md-6">
                <h1>Login</h1>
                <b-form-group label="Username" label-for="username">
                    <b-form-input id="username" v-model="username" placeholder="Username"></b-form-input>
                </b-form-group>
                <b-form-group label="Password" label-for="password">
                    <b-form-input id="password" v-model="password" type="password" placeholder="Password"></b-form-input>
                </b-form-group>
                <b-button variant="primary" @click="submitForm" class="mt-4">Submit</b-button>
                <p class="mt-3">
                    Don't have an account? <router-link to="/register">Register</router-link>
                </p>
            </div>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        submitForm() {
            axios.post('http://159.223.57.121:8090/auth/login', {
                username: this.username,
                password: this.password
            })
                .then(response => {
                    if (response.status === 200) {
                        console.log(this.$store)
                        this.$store.commit('setToken', response.data.data.token);
                        // this.$store.commit('setprofileName', response.data.data.profileName);
                        // this.$store.commit('setUsername', response.data.data.username);

                        localStorage.setItem('token', response.data.data.token);
                        localStorage.setItem('profileName', response.data.data.profileName);
                        localStorage.setItem('username', response.data.data.username);

                        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.data.token}`;

                        this.$router.push('/dashboard');
                    } else {
                        // Handle login failure
                        alert(response.data.message);
                    }
                })
                .catch(error => {
                    // Handle error
                    console.error(error);
                });
        }
    }
}
</script>
  
  
<style scoped>
.login {
    padding-top: 40px;
}

.login h1 {
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 20px;
}

.login img {
    max-width: 50%;
}

.login p {
    margin-top: 20px;
}
</style>
  