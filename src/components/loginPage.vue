<template>
    <div>
        <navbar />
    </div>
    <Loading v-if="loading" />
    <div class="login-box" v-else>
        <h2>LOGIN</h2>
        <form class="form-group" @submit.prevent="handleSubmit">
            <div class="input-field">
                <label for="username">Username</label>
                <input id="username" type="text" class="form-control" v-model="usernameInput" required>
            </div>
            <div class="input-field">
                <label for="password">Password</label>
                <input id="password" type="password" class="form-control" v-model="passwordInput" required>
            </div>
            <div class="center-align">
                <br />
                <button v-on:click="" class="btn btn-default btn-large">login</button>
                <p>Don't have an account? - <RouterLink to="/register"> <a>Sign up</a></RouterLink>
                </p>
            </div>
        </form>
    </div>

</template>

<script setup>

import { ref } from "vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import Loading from './loading.vue'
import navbar from "./navbar.vue";
import { useAuth } from "../store/user";
import {useRouter} from 'vue-router'
const router = useRouter()


const usernameInput = ref("");
const passwordInput = ref("");
const loading = ref(false);

const auth = useAuth();


const handleSubmit = async () => {
    loading.value = true;
    try {
        const response = await fetch(
            `http://localhost:3000/users?username=${usernameInput.value}&password=${passwordInput.value}`,
            {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            }
        );8
        const data = await response.json();
        setTimeout(() => {
            loading.value = false;
            if (data.length == 0) {
                toast("Credentails are invalid");
            } else { 
                toast("User logged in successfully.");
                auth.signin(usernameInput.value, data[0].email, passwordInput.value);
                usernameInput.value = passwordInput.value = "";
                router.push("/")
            }
        }, 3000);
        console.log(data);
    } catch (error) {
        toast("There was a problem with the fetch operation: " + error.message);
    }
};

</script>

<style scoped>
.login-box {
    width: 300px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
    margin-top: 4rem;
}

.login-box h4 {
    text-align: center;
    color: #333;
}

.input-field {
    margin-bottom: 15px;
}

.input-field label {
    display: block;
    margin-bottom: 5px;
    color: #666;
}

.input-field input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 3px;
}

.center-align {
    text-align: center;
}

.btn {
    padding: 10px 20px;
    border: none;
    border-radius: 3px;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
    text-align: center;
    margin:1rem auto ;
}

.btn:hover {
    background-color: #0056b3;
}
h2{
    margin: 3rem auto;
}
</style>