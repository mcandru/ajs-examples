<script setup>
import { ref } from "vue";
import ProductCard from "./components/ProductCard.vue";
import CartItem from "./components/CartItem.vue";
import CartSummary from "./components/CartSummary.vue";

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
  const existingItem = cart.value.find((item) => item.id === id);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.value.push({
      id,
      name,
      price,
      quantity: 1,
    });
  }
};

const incrementQuantity = (item) => {
  item.quantity++;
};

const decrementQuantity = (item) => {
  if (item.quantity > 1) {
    item.quantity--;
  } else {
    removeFromCart(item);
  }
};

const removeFromCart = (itemToRemove) => {
  cart.value = cart.value.filter((item) => item !== itemToRemove);
};

const clearCart = () => {
  cart.value = [];
  discountPercent.value = 0;
};
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
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
          @add-to-cart="addToCart"
        />
      </div>

      <!-- ============================================ -->
      <!-- CART SECTION -->
      <!-- ============================================ -->
      <div class="card">
        <h2>Shopping Cart</h2>

        <div v-if="!cart || cart.length <= 0" class="empty-state">
          <p>Your cart is empty</p>
        </div>

        <div v-else>
          <CartItem
            v-for="item in cart"
            :key="item.id"
            :item="item"
            @increment="incrementQuantity"
            @decrement="decrementQuantity"
            @remove="removeFromCart"
          />
        </div>

        <!-- ============================================ -->
        <!-- CART SUMMARY -->
        <!-- ============================================ -->
        <CartSummary
          :cart="cart"
          v-model:discount-percent="discountPercent"
          @clear-cart="clearCart"
        />
      </div>
    </div>
  </div>
</template>
