<template>
    <div class="register container">
        <div class="row">
            <div class="col-md-6">
                <img :src="require('@/assets/Logos.png')" alt="Some descriptive text" class="img-fluid">
            </div>
            <div class="col-md-6">
                <h1>Register</h1>
                <b-form-group label="Username" label-for="username" class="mb-2">
                    <b-form-input id="username" v-model="username" placeholder="Username"></b-form-input>
                </b-form-group>
                <b-form-group label="Profile Name" label-for="profileName" class="mb-2">
                    <b-form-input id="profileName" v-model="profileName" placeholder="Profile Name"></b-form-input>
                </b-form-group>
                <b-form-group label="Password" label-for="password" class="mb-4">
                    <b-form-input id="password" v-model="password" type="password" placeholder="Password"></b-form-input>
                </b-form-group>
                <b-button variant="primary" @click="submitForm">Submit</b-button>
                <p class="mt-3">
                    Already have an account? <router-link to="/login">Login</router-link>
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
            profileName: '',
            password: '',
        };
    },
    methods: {
        submitForm() {
            axios
                .post('http://159.223.57.121:8090/auth/register', {
                    username: this.username,
                    profileName: this.profileName,
                    password: this.password,
                })
                .then((response) => {
                    console.log(response);
                    if (response.status === 200) {
                        this.$router.push('/login');
                    } else {
                        alert('Registration failed');
                    }
                })
                .catch((error) => {
                    if (error.response) {
                        console.error(error.response.data);
                    } else {
                        console.error(error);
                    }
                });
        },
    },
};
</script>
  
<style scoped>
.register {
    padding-top: 40px;
}

.register h1 {
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 20px;
}

.register img {
    max-width: 50%;
}

.register p {
    margin-top: 20px;
}
</style>
  