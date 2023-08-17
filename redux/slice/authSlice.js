import { TOKEN } from "@/const";
import { createSlice } from "@reduxjs/toolkit";
import { getCookie } from "cookies-next";

const initialState = {
  isAuth: getCookie(TOKEN) ? true : false,
  user: null,
  cart: JSON.parse(localStorage.getItem('cart')) || [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state) => {
      state.isAuth = !state.isAuth;
    },
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    addToCart: (state, { payload }) => {
      const existingProduct = state.cart.find(
        (item) => item._id === payload._id
      );
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cart.push({ ...payload, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    removeFromCart: (state, { payload }) => {
      state.cart = state.cart.filter((item) => item._id !== payload._id);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    decreaseProductQuantity: (state, { payload }) => {
      const { _id } = payload;
      const productToUpdate = state.cart.find((item) => item._id === _id);
      if (productToUpdate && productToUpdate.quantity > 1) {
        productToUpdate.quantity -= 1;
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    clearCart: (state) => {
      state.cart = [];
      localStorage.removeItem("cart");
    },
  },
  extraReducers: {},
});

export const { name, reducer, actions } = authSlice;

export const {
  setAuth,
  setUser,
  addToCart,
  removeFromCart,
  decreaseProductQuantity,
  clearCart,
} = actions;

export default reducer;
