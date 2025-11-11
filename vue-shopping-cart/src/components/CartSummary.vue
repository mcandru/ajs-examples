<script setup>
import { computed } from "vue";

const props = defineProps({
  cart: {
    type: Array,
    required: true,
  },
  discountPercent: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["update:discountPercent", "clear-cart"]);

// Calculate all summary values internally
const subtotal = computed(() => {
  return props.cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
});

const discountAmount = computed(() => {
  return subtotal.value * (props.discountPercent / 100);
});

const tax = computed(() => {
  return (subtotal.value - discountAmount.value) * 0.1;
});

const total = computed(() => subtotal.value - discountAmount.value + tax.value);
</script>

<template>
  <div class="summary">
    <div class="summary-row">
      <span>Subtotal:</span>
      <span>${{ (subtotal / 100).toFixed(2) }}</span>
    </div>

    <div class="summary-row">
      <span>Discount (%):</span>
      <input
        type="number"
        min="0"
        max="100"
        placeholder="0"
        :value="discountPercent"
        @input="emit('update:discountPercent', Number($event.target.value))"
      />
    </div>

    <div class="summary-row">
      <span>Discount Amount:</span>
      <span>-${{ (discountAmount / 100).toFixed(2) }}</span>
    </div>

    <div class="summary-row">
      <span>Tax (10%):</span>
      <span>${{ (tax / 100).toFixed(2) }}</span>
    </div>

    <div class="summary-row total">
      <span>Total:</span>
      <span>${{ (total / 100).toFixed(2) }}</span>
    </div>

    <div class="controls">
      <button @click="emit('clear-cart')">Clear Cart</button>
    </div>
  </div>
</template>
