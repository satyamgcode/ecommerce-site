<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()


import { routerKey, useRoute } from 'vue-router'
const route = useRoute()
route.params.id

import navbar from '../components/navbar.vue'
import footer from '../components/footerPage.vue'
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { ref, onMounted, computed } from 'vue';

import { useAuth } from '../store/user';
const auth = useAuth()

import { useProductStore } from '../store/products.js'
import { fetchProduct } from '../api/index.js';
import { onBeforeMount } from 'vue';

import { useCartStore } from "../store/addtocart"

const addtocart = useCartStore();
const proStore = useProductStore();
const id = route.params.id;

onBeforeMount(async() => {
  const products = await fetchProduct();

  proStore.setData(products);
})

const pro = computed(() => {
    // console.log(route.params.id, proStore.data);
    return  proStore.getProById(route.params.id)
})

const addOrRemove = (id) => {
    if (!auth.user) {
      router.push('/login')
      toast("User not found", { timeout: 3000 })
    }
    if (addtocart.isInTheCart(id)) {
        addtocart.removeFromCart(id);
    } else {
        addtocart.addToCart(id)
    }
}

</script>

<template>
    <RouterLink to="/">
      <button class="back">Back</button>
    </RouterLink>
    <navbar></navbar>
    <div class="product-container">
      <div>
        <img :src="pro.image" alt="Product Image" class="product-image">
      </div>
      <div class="second">
        <h1>Name: {{ pro.name }}</h1>
        <p>Category :{{ pro.category }}</p>
        <p>Price: {{ pro.price }}</p>
        <p>Size: {{ pro.size }}</p>
        <p>Details: {{ pro.detail }}</p>
        <p class="moreDetails">
          <h3>Specification:{{ pro.description}}</h3>
        </p>
        <button class="add-to-cart-btn" @click="addOrRemove(id)">
            {{ addtocart.isInTheCart(id) ? 'Remove from cart':'Add To Cart' }}
        </button>
      </div>
    </div>

    <footer/>
  </template>

<style scoped>

 .product-container {
    max-width: 70vw;
    margin: 3rem auto;
    border: 1px solid rgb(196, 193, 193);
    text-align: center;
    display: flex;
    gap: 5rem;
    padding: 2rem 2rem;
}


.product-image {
    max-width: 100%;
    border-radius: 8px;
    margin-bottom: 20px;
    min-height: 20rem;
    max-height: 20rem;
}

.add-to-cart-btn {
    background-color: #4CAF50;
    /* Green */
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.add-to-cart-btn:hover {
    background-color: #45a049;
    /* Darker green */
}

.first {
    height: 100%;
    width: 100%;
}

.second {
    height: 100%;
    width: 100%;
    max-width: 30vw;
}

p {
    margin-bottom: 1rem;
}

.back {
    position: absolute;
    bottom: 2vh;
    left: 50vw;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2rem;
    width: 5rem;
    border-radius: 0.2rem;
    border: none;
    cursor: pointer;
    border: 1px solid black;
}
</style>



