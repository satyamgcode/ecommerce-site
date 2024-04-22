import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useCartStore = defineStore('cartStore', () => {
  // Check if local storage is available
  const isLocalStorageAvailable = (() => {
    try {
      const testKey = '__test__';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  })();

  // Initialize cartItems based on local storage or empty array
  const initialCartItems = isLocalStorageAvailable
    ? JSON.parse(window.localStorage.getItem("cart_items") || '[]')
    : [];

  const cartItems = ref(initialCartItems);

  const addToCart = (productId) => {
    const product = { id: productId, quantity: 1 };
    cartItems.value.push(product);
    saveCartItems();
  }

  const removeFromCart = (productId) => {
    cartItems.value = cartItems.value.filter(item => item.id !== productId);
    saveCartItems();
  }

  const clearCart = () => {
    cartItems.value = [];
    saveCartItems();
  }

  const cartItemCount = () => {
    return cartItems.value.length;
  }

  const isInTheCart = (id) => {
    return cartItems.value.some((item) => item.id === id);
  }

  // Watch for changes in cartItems and save to local storage
  watch(cartItems, () => {
    saveCartItems();
  });

  const saveCartItems = () => {
    if (isLocalStorageAvailable) {
      localStorage.setItem("cart_items", JSON.stringify(cartItems.value));
    }
  };

  return { addToCart, cartItems, removeFromCart, clearCart, cartItemCount, isInTheCart }
});
