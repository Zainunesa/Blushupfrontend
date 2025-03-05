import { createStore } from 'vuex';
import CheckoutView from '@/views/CheckoutView.vue';

export default createStore({
  state: {
    products: [], // Holds all products
    cart: [], // Holds products added to the cart
  },
  mutations: {
    setProducts(state, payload) {
      state.products = payload;
    },
    addToCart(state, product) {
      const existingProduct = state.cart.find((p) => p.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += 1; // Increase quantity if product already exists
      } else {
        // Ensure price is a number when adding to the cart
        state.cart.push({
          ...product,
          quantity: 1,
          price: Number(product.price),
        });
      }
      localStorage.setItem("cart", JSON.stringify(state.cart)); // Save cart to local storage
    },
    removeFromCart(state, productId) {
      state.cart = state.cart.filter((p) => p.id !== productId); // Remove product from cart
      localStorage.setItem("cart", JSON.stringify(state.cart)); // Save cart to local storage
    },
    setCart(state, cartItems) {
      state.cart = cartItems; // Set the cart state
    },
  },
  actions: {
    async getData({ commit }) {
      try {
        const response = await fetch("http://localhost:3001/products/");
        if (!response.ok) throw new Error("Failed to fetch products");
        const products = await response.json();
        commit("setProducts", products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    addToCart({ commit }, product) {
      commit("addToCart", product);
    },
    removeFromCart({ commit }, productId) {
      commit("removeFromCart", productId);
    },
    loadCart({ commit }) {
      const cart = localStorage.getItem("cart");
      if (cart) {
        const parsedCart = JSON.parse(cart).map((item) => ({
          ...item,
          price: Number(item.price), // Convert price to a number
        }));
        commit("setCart", parsedCart); // Load cart from local storage
      }
    },
    async fetchCart({ commit }) {
      try {
        const response = await fetch("http://localhost:3001/cart");
        const data = await response.json();
        commit("setCart", data);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    },
  },
  getters: {
    cartItems: (state) => state.cart, // Getter for cart items
    cartTotal: (state) =>
      state.cart.reduce(
        (total, product) => total + product.price * product.quantity,
        0
      ), // Getter for cart total
  },
});