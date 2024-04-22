<script setup>

import productCards from '../components/productCards.vue';
import navbar from '../components/navbar.vue'
import footerPage from '../components/footerPage.vue'

import { useCategoryStore } from '../store/category.js'
import { useProductStore } from '../store/products.js'

import { fetchCategory, fetchProduct } from '../api/index.js';
import { onBeforeMount ,ref , computed, watch} from 'vue';

const catStore = useCategoryStore();
const proStore = useProductStore();

onBeforeMount(async() => {
  const category = await fetchCategory();
  const products = await fetchProduct();

  catStore.setData(category);
  proStore.setData(products);
})

const Page = ref(1);
const pro_count = ref(5);

const data = computed(() => {
  const start = (Page.value - 1) * pro_count.value;
  const end = start + pro_count.value;

  return proStore.getProduct.slice(start, end);
});

watch(() => proStore.category, (newValue, oldValue) => {
  if (newValue !== null && newValue !== undefined) {
    Page.value = 1; 
  }
});

const changePage = () => {
  Page.value++;
};

const pageCount = computed(() => Math.ceil(proStore.getProduct.length / pro_count.value));

</script>

<template>
  <!-- navbar -->
  <navbar></navbar>

  <!-- hero section -->

  <div style="z-index: -1;">
    <img class="hero-img" src="../assets/cart.jpg" alt="loading">
    <p class="first">
      Anything you want
    <p class="second">add to cart</p>
    </p>
  </div>

  <!--  category section -->
  <div class="super-category">
    <div class="category">
      <div class="category-card" v-for="cat in catStore.data" @click="proStore.changeCategory(cat.name)">
        <div class="category-img">
          <img class="img-inside" src="../assets/cart.jpg" alt="loading">
        </div>
        <div class="category-title" :class="{ active: proStore.category == cat.name}">
          {{ cat.name }}
        </div>
      </div>
    </div>
  </div>
  <!-- end of category -->

  <!-- cards of the multiple product section -->
  <div class="container">
    <div class="card_temp">
      <!-- Here is where data is used -->
      <productCards v-for="pro in data" :key="pro.id" :id="pro.id">
        <template #image> <img :src="pro.image" class="card-img-top" alt="loading.."></template>
        <template #title>{{ pro.name }}</template>
        <template #description><b>Price:</b> {{ pro.price }}</template>
      </productCards>
    </div>
  </div>
  <!-- end of product cards -->

  <!-- start of Paging -->
  <div class="pagin">
    <button @click="Page--" :disabled="Page == 1" class="btn1">Prev</button>
    <h1 class="pageNo">Page: {{ Page }}</h1>
    <button @click="changePage" :disabled="Page >= pageCount" class="btn2">Next</button>
  </div>
   

  <!-- footer -->
  <footerPage></footerPage>

</template>

<style scoped>
/* Style for the hero section */
.hero-img {
  width: 100%;
  height: 90vh;
  margin: 0 auto;
  position: relative;
}

.first {
  position: absolute;
  font-size: 5rem;
  font-weight: bolder;
  color: rgb(0, 0, 0);
  bottom: 13rem;
  left: 5rem;
  text-shadow: rgb(50, 50, 49) 1px 0 10px;
}

.second {
  font-size: 3rem;
  font-weight: bolder;
  color: black;
  text-align: center;
  background-color: white;
  max-width: 20rem;
  border-radius: 1.5rem;
  margin-top: 1rem;
  text-shadow: none;
}

/*  style for the category section */
.super-category {
  margin: 2rem 4rem;
}

.category {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(14rem, 2fr));
  gap: 0.2rem;
  width: 100%;
  place-items: center;

}

.img-inside {
  width: 100%;
  max-width: 14rem;
  height: 100%;
  max-height: 10rem;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;

}

.category-img {
  left: 0;
  height: 100%;
  width: 100%;
  max-width: 14rem;
  max-height: 10rem;
  top: 0;
  border-radius: 1rem;
}

.category-card {
  height: 100%;
  max-height: 14rem;
  width: 100%;
  max-width: 14rem;
  aspect-ratio: 2.5/2;
  border: 1px solid rgb(214, 211, 211);
  border-radius: 1rem;
}

.category-title {
  padding-top: 1rem;
  padding-bottom: 1rem;
  text-align: center;
}

.category-title.active {
  font-weight: bold;
  color:#4CAF50;
}

/*style fot the product Cards */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0.5rem 5rem;
}

.card_temp {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 2fr));
  width: 100%;
  place-items: center;
  gap: 0.5rem;
}

@media (max-width:800px) {
  .card_temp {
    grid-template-columns: repeat(2, 3fr);
    place-items: center;
  }
}

@media (max-width:650px) {
  .card_temp {
    grid-template-columns: repeat(1, 3fr);
    place-items: center;
  }
}

/* end of style of the product Cards */

/* style of pagination */
.pagin {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.btn1,
.btn2 {
  padding: 10px 20px;
  margin: 0 10px;
  border: none;
  border-radius: 30px;
  background-color: #4CAF50;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.btn1:disabled,
.btn2:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn1:hover,
.btn2:hover {
  background-color: #45a049;
}

.pageNo {
  margin: 0 10px;
  font-size: 18px;
  color: #333;
  font-weight: bold;
}

</style>./footerPage.vue
