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
</script>

<template>
  <div>
    <h1>Shopping Cart Calculator</h1>

    <div class="container">
      <!-- ============================================ -->
      <!-- PRODUCTS SECTION -->
      <!-- ============================================ -->
      <div class="card">
        <h2>Products</h2>

        <!-- TODO 1: Implement displaying products -->
        <div class="product-item">
          <div>
            <strong>Product Name</strong>
            <div>$0.00</div>
          </div>
          <button>Add to Cart</button>
        </div>
      </div>

      <!-- ============================================ -->
      <!-- CART SECTION -->
      <!-- ============================================ -->
      <!-- TODO 2: Implement displaying shopping cart, -->
      <!-- incrementing and decrementing quantity and removing from cart -->
      <div class="card">
        <h2>Shopping Cart</h2>

        <div class="empty-state">
          <p>Your cart is empty</p>
        </div>

        <div>
          <div class="cart-item">
            <div>
              <strong>{{ "Item" }}</strong>
              <div>${{ 0 }} each</div>
            </div>
            <div class="quantity-controls">
              <button class="quantity-btn">-</button>
              <span>0</span>
              <button class="quantity-btn">+</button>
              <button @click="">Remove</button>
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
            <span>${{ 0 }}</span>
          </div>

          <div class="summary-row">
            <span>Discount (%):</span>
            <input type="number" min="0" max="100" placeholder="0" />
          </div>

          <div class="summary-row">
            <span>Discount Amount:</span>
            <span>-${{ 0 }}</span>
          </div>

          <div class="summary-row">
            <span>Tax (10%):</span>
            <span>${{ 0 }}</span>
          </div>

          <div class="summary-row total">
            <span>Total:</span>
            <span>${{ 0 }}</span>
          </div>

          <div class="controls">
            <button>Clear Cart</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
