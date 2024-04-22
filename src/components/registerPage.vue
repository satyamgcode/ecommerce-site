<template>
    <div><navbar/></div>
    
    <div> 
        <Loading v-if="loading" />
     <div class="login-box"  v-else>
         <h2 style="text-align: center;"> Register</h2>
          <form class="form-group" @submit.prevent="registerUser">
             <div class="input-field">
                 <label for="username">Username</label>
                 <input id="username" type="text" class="form-control" v-model="usernameInput"  required>
             </div>
             <div class="input-field">
                 <label for="email">Email</label>
                 <input id="email" type="text" class="form-control" v-model="emailInput"  required>
             </div>
             <div class="input-field">
                 <label for="password">Password</label>
                 <input id="password" type="password" class="form-control" v-model="passwordInput"  required>
             </div>
             <div class="center-align">
        
                 <button  class="btn btn-primary btn-large">Register</button>
                 
                 <p>Already have an account? - <RouterLink to="/login">
                    <a>Login Now</a>
                 </RouterLink></p> 
             </div>
         </form>
     </div>
    </div> 
    <div>
    <footer/>
    </div>
    </template>
    
    
    <script setup>
    
    import { ref } from "vue";
    import Loading from "./loading.vue";
    import { toast } from "vue3-toastify";
    import "vue3-toastify/dist/index.css";
    import navbar from "./navbar.vue";
    import footer from "./footerPage.vue";
    // import { useRouter } from "vue-router";
    // const router = useRouter();
    
    const emailInput = ref("");
    const usernameInput = ref("");
    const passwordInput = ref("");
    const loading = ref(false);
    const users = ref([]);
    
    
    const registerUser = async () => {
    try {
     const userData = {
       username: usernameInput.value,
       email: emailInput.value,
       password: passwordInput.value
     };
    
     const response = await fetch("http://localhost:3000/users", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(userData),
     });
    
     if (!response.ok) {
       throw new Error("Registration failed");
     }
    
     const data = await response.json();
     toast("user registered successfully");
     console.log("Registration successful:", data);
    
     // Reset form fields
     emailInput.value = "";
     usernameInput.value = "";
     passwordInput.value = "";
    
     router.push("/login");
     await getData();
    } catch (error) {
     toast("Invalid");
     console.error("Error:", error);
    }
    };
    
    const getData = async () => {
    const response = await fetch("http://localhost:3000/users", {
     method: "GET",
     headers: {
       "Content-Type": "application/json",
     }
    });
    
    if (!response.ok) {
     throw new Error("Registration failed");
    }
    
    //   const data = await response.json();
    users.value = await response.json();
    };
    
    getData()
    
    </script>
    
<style scoped>
.login-box{
    margin-top: 4rem;
}
h2{
    margin-bottom: 2rem;
}
.form-group {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.input-field {
  margin-bottom: 20px;
}

.label {
  display: block;
  margin-bottom: 5px;
  color: #333;
  font-weight: bold;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.btn {
  display: inline-block;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 2rem;
}

.btn:hover {
  background-color: #0056b3;
}

.center-align {
  text-align: center;
}

    </style>