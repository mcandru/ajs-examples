# Vue Shopping Cart Calculator

Build a functional shopping cart with Vue 3 to practice reactive state management, computed properties, and event handling.

## Setup

1. Install dependencies: `npm install`
2. Start the development server: `npm run dev`
3. Open your browser to the URL shown in the terminal (usually http://localhost:5173)

## Your Task

Complete the Shopping Cart Calculator by implementing the missing Vue functionality. The scaffolding is provided, but you'll need to fill in the core Vue concepts.

### Features to Implement

1. **Product Catalog**
   - Display available products with their prices
   - Allow users to add products to the cart

2. **Shopping Cart**
   - Display items currently in the cart
   - Show quantity for each item
   - Allow users to:
     - Increase/decrease quantities
     - Remove items from cart
     - Clear entire cart

3. **Price Calculations**
   - Calculate subtotal (sum of all items)
   - Apply a discount percentage (use computed properties!)
   - Calculate tax on the discounted amount
   - Display final total

4. **Bonus Challenges** (Optional)
   - Add input validation (minimum quantity, etc.)
   - Persist cart data to localStorage
   - Add product search/filter functionality
   - Show item count badge on cart

### Vue Concepts to Practice

- **Reactive Data**: Use `ref()` and `reactive()` for state management
- **Computed Properties**: Calculate derived values efficiently
- **Methods**: Handle user interactions
- **Event Handling**: `@click`, `@input`, etc.
- **List Rendering**: `v-for` to display products and cart items
- **Conditional Rendering**: `v-if` / `v-show` for empty states
- **Two-way Binding**: `v-model` for input fields

### Tips

- Start by getting the basic data structure right (products array, cart array/object)
- Use computed properties for calculations that depend on reactive data
- Remember that Vue 3 uses the Composition API with `ref()` and `reactive()`
- Check the browser console for any errors
- Use Vue DevTools browser extension to inspect your reactive state

### Resources

- [Vue 3 Documentation](https://vuejs.org/guide/introduction.html)
- [Reactivity Fundamentals](https://vuejs.org/guide/essentials/reactivity-fundamentals.html)
- [Computed Properties](https://vuejs.org/guide/essentials/computed.html)
- [Event Handling](https://vuejs.org/guide/essentials/event-handling.html)
