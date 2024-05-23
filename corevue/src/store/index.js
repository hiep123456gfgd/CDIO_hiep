// src/store/index.js
import { createStore } from 'vuex';

export default createStore({
  state: {
    cartItems: JSON.parse(localStorage.getItem('cartItems')) || []
  },
  mutations: {
    SET_CART_ITEMS(state, items) {
      state.cartItems = items;
      localStorage.setItem('cartItems', JSON.stringify(items));
    },
    ADD_TO_CART(state, item) {
      const existingItem = state.cartItems.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...item, quantity: 1 });
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    REMOVE_FROM_CART(state, item) {
      const existingItem = state.cartItems.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.cartItems = state.cartItems.filter(cartItem => cartItem.id !== item.id);
        }
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    }
  },
  actions: {
    addToCart({ commit }, item) {
        console.log(item);
      commit('ADD_TO_CART', item);
    },
    removeFromCart({ commit }, item) {
        console.log(item);
      commit('REMOVE_FROM_CART', item);
    }
  },
  getters: {
    cartItems: state => state.cartItems,
    cartItemCount: state => state.cartItems.reduce((total, item) => total + item.quantity, 0),
    cartTotal: state => state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
  }
});
