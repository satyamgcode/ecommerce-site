<template>
    <Navbar/>
    <h1>Your Cart</h1>
    <div class="cart">
        <productCards v-for="pro in cartData" :id="pro.id">
        <template #image> <img :src="pro.image" class="card-img-top"
            alt="loading.."></template>
        <template #title>{{pro.name}}</template>
        <template #description>
          <b>Price: </b> {{ pro.price }}
        </template>
      </productCards>
      <p>Total: {{ cartStore.cartItemCount() }}</p>
    </div>
    <div>
        <RouterLink to="/"><button class="home-btn">Home</button></RouterLink>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { useCartStore } from '../store/addtocart';
  import { useProductStore } from '../store/products';
  import productCards from './productCards.vue';
  import {useRouter} from 'vue-router'
  import Navbar from './navbar.vue';
  const router = useRouter()
  
  const cartStore = useCartStore();
  const productStore = useProductStore();
 
  const removeItem = (item) => {
    cartStore.removeItem(item);
  };

  const cartData = computed(() => {
    const cart = [];

    cartStore.cartItems.forEach((item) => {
        const product = productStore.getProById(item.id);
        if (!product) {
            console.error(`Could not find product with id ${item.id}`);
            return;
        }
        cart.push({ ...product });
    })

    return cart
  })


  </script>
  
  <style scoped>
 h1{
    font-size: 3rem;
    text-align: center;
    font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
 }

 .cart{
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin: 4rem;
 }

 .home-btn {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-bottom: 4rem; 
  margin-left: 50rem; 
}

.home-btn:hover {
  background-color: #0056b3;
}


</style>
  