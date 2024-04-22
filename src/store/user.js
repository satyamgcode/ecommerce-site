import { defineStore } from "pinia";
import { ref, watch } from "vue";
// import axios from 'axios'; 


export const useAuth = defineStore("authStore", () => {
    const userFromLocalStorage = window.localStorage.getItem("user_info")
    const user = ref(userFromLocalStorage ? JSON.parse(userFromLocalStorage) : null);

    const signin = (username, email, password) => {
        user.value = {
            username,
            password,
            email
        }
    }

    const logout = () => {
        user.value = null
    }

    watch(() => user.value, (newValue) => {
        if (newValue) {
            window.localStorage.setItem("user_info", JSON.stringify(newValue))
        } else {
            window.localStorage.removeItem("user_info");
        }
    })

  return { user, signin, logout };

});

