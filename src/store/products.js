// import { defineStore } from 'pinia';
// import { ref, computed } from 'vue'

// export const useProductStore = defineStore('productStore', () => {
//   const categoary = ref(null)
//   const data = ref([])

//   const getProduct = computed(() => {
//     if (categoary.value === null || categoary.value == 'All') return data.value;
//     else return data.value.filter((pro) => {
//         return pro.category == categoary.value
//     })
//   })

//   const changeCategory = (cat) => {
//     categoary.value = cat;
//   }

//   const setData = (d) => {
//     data.value = d
//   }

//   const getProById = (id) => {
//     const index = data.value.findIndex((pro) => pro.id == id);
//     return data.value[index];
//   }

//   return { data, getProduct, changeCategory, setData, getProById };
// });

import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';

export const useProductStore = defineStore('productStore', () => {
  const category = ref(null);
  const data = ref([]);

  // Load data from local storage on initialization
  const storedData = localStorage.getItem('product_data');
  if (storedData) {
    data.value = JSON.parse(storedData);
  }

  // Save data to local storage whenever it changes
  watch(data, (newValue) => {
    localStorage.setItem('product_data', JSON.stringify(newValue));
  });

  const getProduct = computed(() => {
    if (category.value === null || category.value == 'All') return data.value;
    else return data.value.filter((pro) => pro.category == category.value);
  });

  const changeCategory = (cat) => {
    category.value = cat;
  };

  const setData = (d) => {
    data.value = d;
  };

  const getProById = (id) => {
    const index = data.value.findIndex((pro) => pro.id == id);
    return data.value[index];
  };

  return { data, getProduct, changeCategory, setData, getProById, category };
});
