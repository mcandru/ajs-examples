<script setup>
defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["add-to-cart"]);
</script>

<template>
  <div class="product-item">
    <div>
      <strong>{{ product.name }}</strong>
      <div>${{ (product.price / 100).toFixed(2) }}</div>
    </div>
    <button @click="emit('add-to-cart', product)">Add to Cart</button>
  </div>
</template>
