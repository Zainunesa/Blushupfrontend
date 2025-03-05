// // store/cart.js
// export default {
//     state: {
//         cart: [],
//       },      
//     mutations: {
//       ADD_TO_CART(state, product) {
//         const item = state.cart.find(p => p.id === product.id);
//         if (item) {
//           item.quantity += 1; // Increase quantity if item already in cart
//         } else {
//           state.cart.push({ ...product, quantity: 1 }); // Add new item
//         }
//       }
//     },
//     actions: {
//       addToCart({ commit }, product) {
//         commit('ADD_TO_CART', product);
//       }
//     },
//     getters: {
//       cartCount: state => state.cart.reduce((total, item) => total + item.quantity, 0)
//     }
//   };
  