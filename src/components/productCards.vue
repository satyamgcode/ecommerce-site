<script setup>
import { useRouter } from 'vue-router'

import { useCartStore } from "../store/addtocart"
import { useAuth } from '../store/user';
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
const addtocart = useCartStore();
const auth = useAuth()

defineProps(['id'])

const router = useRouter()

const viewProductDetails = (productId) => {
  router.push({ name: 'showDetails' , params: { id: productId  } } );
};

const addOrRemove = (id) => {
    if (!auth.user) {
        toast("User not found", { timeout: 3000 })
        router.push('/login')
        return
    }
    if (addtocart.isInTheCart(id)) {
        addtocart.removeFromCart(id);
    } else {
        addtocart.addToCart(id)
    }
}

</script>

<template>
    <div class="card" style="max-width: 18rem;width:100%;min-width: 14rem;" @click="viewProductDetails(id)">
        <slot name="image">
            <img src="../assets/cart.jpg" class="card-img-top" alt="loading..">
        </slot>

        <div class="card-body">
            <h5 class="card-title">
                <slot name="title">
                    Card title
                </slot>
            </h5>
            <p class="card-text">
                <slot name="description">
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                </slot>
            </p>
            <slot name="footer">
                <button class="cards-btn" @click.stop.prevent="addOrRemove(id)">
                    {{ addtocart.isInTheCart(id) ? 'Remove from cart':'Add To Cart' }}
                </button>
            </slot>
        </div>
    </div>
</template>

<style>
.card {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 20px;
    aspect-ratio: 3/2;
    margin-top: 2rem;
    margin-bottom: 2rem;
}

.card-img-top {
    min-height: 12rem;
    margin-bottom: 1rem;
    background-color: gray;
    height: 11rem;
    width: 100%;
    border-radius: 1rem;
}

.cards-btn {
    background: rgb(13, 100, 206);
    height: 2.1rem;
    border: none;
    border-radius: 0.2rem;
    padding-left: 1rem;
    padding-right: 1rem;
    color: white;
    cursor: pointer;
}

.card-body {
    padding: 1rem;
}
h5{
    margin-bottom: 1rem;
}
.card-text{
    margin: 1rem auto;
}
</style>
