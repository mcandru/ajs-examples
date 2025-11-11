<script setup>
import { ref, computed } from "vue";

// ============================================
// AVAILABLE PRODUCTS
// ============================================
// This array contains the products available in the store
const products = [
  { id: 1, name: "Laptop", price: 99999 },
  { id: 2, name: "Wireless Mouse", price: 2999 },
  { id: 3, name: "Keyboard", price: 7999 },
  { id: 4, name: "Monitor", price: 29999 },
  { id: 5, name: "USB-C Cable", price: 1299 },
  { id: 6, name: "Headphones", price: 14999 },
];

const cart = ref([]);
const discountPercent = ref(0);

const addToCart = ({ id, name, price }) => {
  cart.value.push({
    id,
    name,
    price,
    quantity: 1,
  });
};

const removeFromCart = (itemToRemove) => {
  cart.value = cart.value.filter((item) => item !== itemToRemove);
};

const subtotal = computed(() => {
  return cart.value.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
});

const discountAmount = computed(() => {
  return subtotal.value * (discountPercent.value / 100);
});

const tax = computed(() => {
  return (subtotal.value - discountAmount.value) * 0.1;
});

const total = computed(() => subtotal.value - discountAmount.value + tax.value);
</script>

<template>
  <div>
    <h1>Shopping Cart Calculator</h1>

    <div class="container">
      <!-- ============================================ -->
      <!-- PRODUCTS SECTION -->
      <!-- ============================================ -->
      <!-- TODO 1: Implement displaying products -->
      <div class="card">
        <h2>Products</h2>

        <div v-for="product in products" class="product-item">
          <div>
            <strong>{{ product.name }}</strong>
            <div>{{ (product.price / 100).toFixed(2) }}</div>
          </div>
          <button @click="addToCart(product)">Add to Cart</button>
        </div>
      </div>

      <!-- ============================================ -->
      <!-- CART SECTION -->
      <!-- ============================================ -->
      <!-- TODO 2: Implement displaying shopping cart, -->
      <!-- incrementing and decrementing quantity and removing from cart -->
      <div class="card">
        <h2>Shopping Cart</h2>

        <div v-if="!cart || cart.length <= 0" class="empty-state">
          <p>Your cart is empty</p>
        </div>

        <div v-else>
          <div v-for="item in cart" class="cart-item">
            <div>
              <strong>{{ item.name }}</strong>
              <div>${{ (item.price / 100).toFixed(2) }} each</div>
            </div>
            <div class="quantity-controls">
              <button @click="item.quantity--" class="quantity-btn">-</button>
              <span>{{ item.quantity }}</span>
              <button @click="item.quantity++" class="quantity-btn">+</button>
              <button @click="removeFromCart(item)">Remove</button>
            </div>
          </div>
        </div>

        <!-- ============================================ -->
        <!-- CART SUMMARY -->
        <!-- ============================================ -->
        <!-- TODO 3: Calculate and display subtotal, track discount amount, -->
        <!-- calculate discount, tax, and calculate the total. Implement the cart clearing  -->

        <div class="summary">
          <div class="summary-row">
            <span>Subtotal:</span>
            <span>${{ (subtotal / 100).toFixed(2) }}</span>
          </div>

          <div class="summary-row">
            <span>Discount (%):</span>
            <!-- Hint: Use v-model to bind -->
            <input
              type="number"
              min="0"
              max="100"
              placeholder="0"
              v-model="discountPercent"
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
            <button @click="cart = []">Clear Cart</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
