<template>
   <div class="loader">
    <h1 style="text-align: center;">Loading</h1>
    <div class="loading-circle"></div>
   </div>

</template>

<script setup>

</script>

<style scoped>
*{
    box-sizing: border-box;
}

.loader {
    position: fixed;
    top:50%;
    left:50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

    .loading-circle {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;

}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

</style>