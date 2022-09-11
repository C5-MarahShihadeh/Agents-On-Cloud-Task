import { createSlice } from "@reduxjs/toolkit";

const cart = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    amount: parseInt(localStorage.getItem("amount")) || 0,
    price: parseInt(localStorage.getItem("price")) || 0,
  },
  reducers: {
    addTocart: (state, action) => {
      state.cart.push(action.payload);
    },

    deleteFromcart: (state, action) => {
      state.cart = state.cart.filter((element, index) => {
        return element.id != action.payload;
      });
    },

    updatecart: (state, action) => {
      state.cart = state.cart.map((element, index) => {
        if (element.id == action.payload.id) {
          return action.payload;
        }
        return element;
      });
    },

    setcart: (state, action) => {
      state.cart = action.payload;
    },
    setAmount: (state, action) => {
      state.amount = state.amount + 1;
      localStorage.setItem("amount", state.amount);
    },
    decrease: (state, action) => {
      state.amount = state.amount - 1;
      localStorage.setItem("amount", state.amount);
    },
    erase: (state, action) => {
      state.amount = state.amount - action.payload;
      localStorage.setItem("amount", state.amount);
    },
    erasePrice: (state, action) => {
      state.price = state.price - action.payload;
      localStorage.setItem("price", state.price);
    },
    zero: (state, action) => {
      state.amount = 0;
      localStorage.setItem("amount", state.amount);
    },
    setPrice: (state, action) => {
      state.price = action.payload + state.price;
      localStorage.setItem("price", state.price);
    },
    decreasePrice: (state, action) => {
      state.price = state.price - action.payload;
      localStorage.setItem("price", state.price);
    },
    zeroPrice: (state, action) => {
      state.price = 0;
      localStorage.setItem("price", state.price);
    },
    renderPrice: (state, action) => {
      state.price = action.payload;
      localStorage.setItem("price", state.price);
    },
    renderamount: (state, action) => {
      state.amount = action.payload;
      localStorage.setItem("amount", state.amount);
    },
  },
});

export const {
  setcart,
  updatecart,
  deleteFromcart,
  addTocart,
  setAmount,
  decrease,
  zero,
  zeroPrice,
  setPrice,
  decreasePrice,
  erase,
  erasePrice,
  renderPrice,
  renderamount,
} = cart.actions;

export default cart.reducer;
