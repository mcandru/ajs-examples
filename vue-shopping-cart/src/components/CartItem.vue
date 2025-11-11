<script setup>
defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["increment", "decrement", "remove"]);
</script>

<template>
  <div class="cart-item">
    <div>
      <strong>{{ item.name }}</strong>
      <div>${{ (item.price / 100).toFixed(2) }} each</div>
    </div>
    <div class="quantity-controls">
      <button @click="emit('decrement', item)" class="quantity-btn">-</button>
      <span>{{ item.quantity }}</span>
      <button @click="emit('increment', item)" class="quantity-btn">+</button>
      <button @click="emit('remove', item)">Remove</button>
    </div>
  </div>
</template>
