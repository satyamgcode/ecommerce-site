<template>

  <navbar/>
  
    <div style="text-align: center; margin-top: 3rem; font-size: x-large;">
        <h1> ADD NEW PRODUCT</h1>
    </div>
    <div class="productDetails">
        <form @submit.prevent="getProDetails" ref="form">
            <label for="product-img">
                Select Image :
            </label>
            <input class="browse" type="file" id="product-img"   v-on:change="handleImageUpload"/>
  
            <label for="product-category"> Category : </label>
            <select name="category" id="product-category"  v-model="selectedCategory">
               <option value='' >Select category...</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Fashion">Fashion</option>
                <option value="Home & Kitchen">Home & Kitchen</option>
                <option value="Sports & Outdoors">Sports & Outdoors</option>
                <option value="All">All</option>
            </select>
  
            <label for="product-name"> Name :</label>
            <input type="text" id="product-name"  v-model="productName"/>
  
            <label for="product-detail"> Product-detail : </label>
            <input type="text" id="product-detail"   v-model="productDetail"/>
  
            <label for="product-price"> Enter Cost :</label>
            <input type="text" id="product-price"   v-model="productPrice"/>
  
            <label for="product-size"> Enter Size : </label>
            <input type="text" id="product-size"    v-model="productSize"/>
  
            <label for="product-description">Description : </label>
            <input type="text" id="product-description" v-model="productDescription" />
  
            <input type="Submit" name="Add" value="Add">
        </form>
    </div>
  </template>

<script setup>

import { ref } from "vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { useRouter } from "vue-router";
import navbar from "../components/navbar.vue"


const productImage = ref(""); 
const selectedCategory = ref("");
const productName = ref("");
const productDetail = ref("");
const productPrice = ref('');
const productSize = ref("")
const productDescription = ref("");
const users = ref([]);

const form = ref(null);



const router = useRouter();

const getProDetails = async () => {
  try {
    const userData = {
      image: productImage.value,
      category: selectedCategory.value,
      name: productName.value,
      detail: productDetail.value,
      price: productPrice.value,
      size: productSize.value,
      description: productDescription.value
    };

    const response = await fetch("http://localhost:3000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Data not stored");
    }

    const data = await response.json();
    toast("Data updated sucessfully");
    console.log("Data updated sucessfully:", data);

    form.value.reset()

    await getData();
  } catch (error) {
    toast("Invalid");
    console.error("Error:", error);
  }
};


const getData = async () => {
  const response = await fetch("http://localhost:3000/products", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  });

  if (!response.ok) {
    throw new Error("Registration failed");
  }

  users.value = await response.json();
};

getData()


const handleImageUpload = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    productImage.value = e.target.result;
  };

  reader.readAsDataURL(file);
};

</script>




<style scoped>
.productDetails {
  margin: 2rem auto;
  max-width: 400px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input[type="text"],
select {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

input[type="submit"] {
  padding: 10px 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  align-self: center;
  width: 100%;
  max-width: 5rem;
}

input[type="submit"]:hover {
  background-color: #0056b3;
}

input[type="submit"]:active {
  background-color: #0056b3;
}

.browse {
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
}
</style>