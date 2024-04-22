<!-- DiscoverPage.vue -->

<template>
    <div>
      <h1>Discover Page</h1>
      <form @submit.prevent="addCategory">
        <input type="text" v-model="newCategory" placeholder="Enter category name" required />
        <button type="submit">Add Category</button>
      </form>
  
      <ul>
        <li v-for="(category, index) in categories" :key="index">
          {{ category }}
          <button @click="deleteCategory(index)">Delete</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  
  const store = useStore();
  const categories = computed(() => store.getters['categories/allCategories']);
  
  let newCategory = '';
  
  const addCategory = () => {
    if (newCategory.trim() !== '') {
      store.dispatch('categories/addCategory', newCategory.trim());
      newCategory = '';
    }
  };
  
  const deleteCategory = (index) => {
    store.dispatch('categories/deleteCategory', index);
  };
  </script>
  