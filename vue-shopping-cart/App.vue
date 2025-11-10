<script setup>
import { ref, computed } from 'vue'

// ============================================
// AVAILABLE PRODUCTS
// ============================================
// This array contains the products available in the store
const products = [
  { id: 1, name: 'Laptop', price: 999.99 },
  { id: 2, name: 'Wireless Mouse', price: 29.99 },
  { id: 3, name: 'Keyboard', price: 79.99 },
  { id: 4, name: 'Monitor', price: 299.99 },
  { id: 5, name: 'USB-C Cable', price: 12.99 },
  { id: 6, name: 'Headphones', price: 149.99 },
]

// ============================================
// TODO 1: REACTIVE STATE
// ============================================
// Create reactive state for:
// - cart: An array or object to store cart items (each item should have: productId, name, price, quantity)
// - discountPercent: A number for the discount percentage (default: 0)
// - taxRate: A number for the tax rate (default: 0.1 for 10%)

// TODO: Define your reactive state here
// Hint: Use ref() for primitive values, reactive() or ref() for objects/arrays


// ============================================
// TODO 2: COMPUTED PROPERTIES
// ============================================
// Create computed properties for:
// - subtotal: Sum of (price * quantity) for all items in cart
// - discountAmount: The dollar amount of discount based on subtotal and discountPercent
// - subtotalAfterDiscount: Subtotal minus discount
// - taxAmount: Tax on the discounted subtotal
// - total: Final amount (subtotal - discount + tax)
// - cartItemCount: Total number of items in cart

// TODO: Define your computed properties here
// Example structure:
// const subtotal = computed(() => {
//   // Your calculation here
// })


// ============================================
// TODO 3: METHODS
// ============================================
// Create methods for:
// - addToCart(product): Add a product to the cart (if already exists, increase quantity)
// - removeFromCart(productId): Remove an item completely from the cart
// - updateQuantity(productId, newQuantity): Update the quantity of an item
// - clearCart(): Remove all items from cart

// TODO: Define your methods here
// Example:
// const addToCart = (product) => {
//   // Your logic here
// }


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

        <!-- TODO 4: RENDER PRODUCT LIST -->
        <!-- Use v-for to loop through products array -->
        <!-- Each product should display name, price, and an "Add to Cart" button -->

        <div class="product-item">
          <div>
            <strong>Product Name</strong>
            <div>$0.00</div>
          </div>
          <button>Add to Cart</button>
        </div>

        <!-- TODO: Replace above div with v-for loop -->

      </div>

      <!-- ============================================ -->
      <!-- CART SECTION -->
      <!-- ============================================ -->
      <div class="card">
        <h2>Shopping Cart</h2>

        <!-- TODO 5: SHOW EMPTY STATE -->
        <!-- Use v-if to show this only when cart is empty -->
        <div class="empty-state">
          <p>Your cart is empty</p>
        </div>

        <!-- TODO 6: RENDER CART ITEMS -->
        <!-- Use v-for to loop through cart items -->
        <!-- Use v-if to show this only when cart has items -->
        <!-- Each item should show: name, price, quantity controls, remove button -->

        <div>
          <div class="cart-item">
            <div>
              <strong>Item Name</strong>
              <div>$0.00 each</div>
            </div>
            <div class="quantity-controls">
              <button class="quantity-btn">-</button>
              <span>0</span>
              <button class="quantity-btn">+</button>
              <button @click="">Remove</button>
            </div>
          </div>

          <!-- TODO: Replace with v-for loop through cart items -->
        </div>

        <!-- ============================================ -->
        <!-- CART SUMMARY -->
        <!-- ============================================ -->
        <!-- TODO 7: DISPLAY CALCULATIONS -->
        <!-- Show the computed values: subtotal, discount, tax, and total -->
        <!-- Use v-if to only show when cart has items -->

        <div class="summary">
          <div class="summary-row">
            <span>Subtotal:</span>
            <span>${{ 0 }}</span>
          </div>

          <!-- Discount Input -->
          <div class="summary-row">
            <span>Discount (%):</span>
            <!-- TODO: Use v-model to bind discountPercent -->
            <input
              type="number"
              min="0"
              max="100"
              placeholder="0"
            />
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
            <button @click="">Clear Cart</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
