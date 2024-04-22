import { defineStore } from "pinia";
import { ref } from "vue";

export const useCategoryStore = defineStore("store", () => {
  const data = ref([]);
  const setData = (d) => {
    data.value = d
  }

  return { data, setData };

});
