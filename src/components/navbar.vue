<script setup>
import { useAuth } from '../store/user';
import profileIcons from './icons/user.vue'
import cartIcons from './icons/cart.vue'
import {useRouter} from 'vue-router'
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

import { useProductStore } from '../store/products.js'
const proStore = useProductStore();

import { ref, computed, watch, onMounted } from 'vue';
import { TransitionGroup } from 'vue'; // Ensure correct import path
import { fetchCategory } from '../api';

const searchQuery = ref('');
const suggestions = ref([]);
const mockData = ref([
  { id: 1, name: 'Electronics' },
  { id: 2, name: 'Clothing' },
  { id: 3, name: 'Home & Kitchen' },
  { id: 4, name: 'Sports & Outdoors' },
  { id: 5, name: 'Beauty & Personal Care' },
  { id: 6, name: 'All' }
]);


// Mock data with categories

onMounted(async () => {
  // mockData.value = await fetchCategory()
})
suggestions.value = mockData.value; // Initialize suggestions with mock data

// Filter suggestions based on search query
const filteredSuggestions = computed(() => {
  if (!searchQuery.value.trim()) {
    return [];
  }
  const regex = new RegExp(searchQuery.value.trim(), 'i');
  return suggestions.value.filter(item => regex.test(item.name));
});

const selectSuggestion = (suggestion) => {
  searchQuery.value = "";
  // suggestions.value = []; // Clear suggestions after selecting

  window.scroll({
    top: 750, // Scroll to the bottom of the page
    behavior: 'smooth' // Smooth scrolling animation
  });

  proStore.changeCategory(suggestion.name)
  // router.push(`/category/${suggestion.id}`); // Assuming the category ID is used in the route
};

const showSuggestions = computed(() => {
  return searchQuery.value.trim() !== '' || filteredSuggestions.value.length > 0;
});

const router = useRouter()

const auth = useAuth();
const showProfilePop = ref(false);

const toggleProfilePop = () => {
  showProfilePop.value = !showProfilePop.value;
};

const hideProfilePop = () => {
  showProfilePop.value = false;
};

const logout = () => {
  auth.logout();
  hideProfilePop();
  router.push('/');
};

const addOrRemove = (id) => {
    if (!auth.user) {
        toast("User not found")
        router.push('/login')
        return
    }
    else {
      router.push('/cart');
    }
}

</script>

<template>
<!-- navbar  -->
<div class="navbar" >

<RouterLink to="/">
  <h1 class="logo">ClickCart</h1>
</RouterLink>

<div class="navlist">

  <a href="#" class="navitems">Discover </a>
  <RouterLink class="navitems" to="/contact">Contact us</RouterLink>
</div>

<!-- search bar -->
<div class="search-container">
    <input type="text" class="search-bar" placeholder="Search . . ." v-model="searchQuery">
    <TransitionGroup name="fade" tag="ul" class="suggestions" v-if="showSuggestions">
      <li v-for="(suggestion, index) in filteredSuggestions" :key="suggestion.id" @click="selectSuggestion(suggestion)">
        {{ suggestion.name }}
      </li>
    </TransitionGroup>
  </div>

<!-- cart icon -->
<div class="cart-icon" @click="addOrRemove" >
  <cartIcons/>
</div>

<!-- profile icon -->
<div class="profile-icon" v-if="auth.user" @click="toggleProfilePop">
    <profileIcons/>
  </div>  

<div class="btn" v-else>
 <RouterLink to="/login">
  <button class="login-btn">login </button>
 </RouterLink>
  <RouterLink to="/register">
    <button  class="login-btn" >Signup</button>
  </RouterLink>
</div>

    <!-- Profile pop-up -->
    <div v-if="auth.user" class="profile-pop" :class="{ 'show': showProfilePop }">
      <div class="profile-content">
        <p><b>Name :</b> {{ " " + auth.user.username }}</p>
        <p><b>Email :</b> {{ " " + auth.user.email }}</p>
        <RouterLink to="/cart"><button class="cart" >Cart</button></RouterLink>
        <button @click="logout">Logout</button>
      </div>
    </div>


</div>
<!-- end of navbar -->
</template>

<style>
/*  style for the navbar */
.logo{
  color: black;
}
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.7rem;
  /* max-width: 100%; */
  width: 100%;
  margin: 0 auto;
  background-color: whitesmoke;
  position: sticky;
  top: 0;
  z-index: 1000;
  padding-left: 2rem;
  padding-right: 2rem;
}

.navlist {
  display: flex;
  margin-right: 2rem;
  align-items: center;
  width: 100%;
  max-width: 10rem;
  margin-left: 2rem;
  justify-content: space-between;
}

.navitems {
  margin-left: 0.5rem;
}

/*  style for the search container */
.search-container {
  margin-right: 1rem;
  margin-left: 1rem;
  width: 100%;

}

.search-bar {
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 14px;
  width: 100%;
}

.search-btn:hover {
  background-color: #0056b3;
  /* Change color on hover */
}

/* Style the search bar */
.search-container {
  margin-right: 1rem;
  margin-left: 1rem;
  width: 100%;
}

.search-bar {
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 14px;
  width: 100%;
}

/* Animation for TransitionGroup */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

/* style for the login button */
.login-btn {
  height: 2.5rem;
  color: #fff;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  font-family: sans-serif;
  font-weight: 500;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  outline: none;
  font-size: 15px;
  margin-left: 0.5rem;
}

.login-btn {
  background: #004dff;
  background: linear-gradient(0deg, #004dff 0%, #004dff 100%);
  border: none;
}

.btn {
  display: flex;
}

/* profile icon styling */
.profile-icon {
  width: 40px;
  height: 40px;
  min-width: 40px;
  min-height: 40px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #ccc; /* Placeholder background color */
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
}

.profile-icon svg {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* cart icon */
.cart-icon {
  width: 40px;
  height: 40px;
  min-width: 40px;
  min-height: 40px;
  overflow: hidden;
  background-color: #ccc; /* Placeholder background color */
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
  background: none;
  margin-right: 10px;
}

.cart-icon svg {
  width:100%;
  height: 100%;
  object-fit: cover
}

/* Pop up styling */
.profile-pop {
  position: absolute;
  top: 80px; /* Increased distance from the top */
  right: 20px; /* Increased distance from the right */
  background-color: #ffffff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3); /* Increased box-shadow size and opacity */
  border-radius: 10px; /* Rounded corners */
  padding: 20px 10px; /* Increased padding */
  display: none;
  z-index: 100; /* Ensure it's above other elements */
  width: 300px; /* Increased width */
}

.profile-pop.show {
  display: block;
}

.profile-content {
  text-align: center;
  color: #333333; 
}

.profile-pop::before {
  content: '';
  position: absolute;
  top: -15px;
  right: 15px;
  border-width: 0 15px 15px;
  border-style: solid;
  border-color: transparent transparent #ffffff;
}
.profile-content button {
  margin-top: 40px;
  padding: 10px 20px; 
  background-color: #ff6347; 
  color: #ffffff; 
  border: none; 
  border-radius: 5px;
  cursor: pointer; 
  transition: background-color 0.3s; 
}

.profile-content button:hover {
  background-color: #ff5733; /* Darker coral color on hover */
}
.cart{
  margin-right: 10px;
}

/* suggestion list styling */
.suggestions {
  list-style-type: none;
  margin: 0;
  padding: 0;
  border: 1px solid #ccc;
  border-top: none;
  position: absolute;
  background-color: #fff;
  width: 69.45rem;
  z-index: 1000;
}

.suggestions li {
  padding: 10px;
  cursor: pointer;
}

.suggestions li:hover {
  background-color: #f1f1f1;
}

/* Animation for TransitionGroup */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>
