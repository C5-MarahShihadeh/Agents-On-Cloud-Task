import { configureStore } from "@reduxjs/toolkit";
import auth from "./reducers/auth";
import books from "./reducers/books";
import favorite from "./reducers/favorite";
import comments from "./reducers/comments";
import cart from "./reducers/cart";


export default configureStore({
  reducer: {
    auth: auth,
    books: books,
    favorite:favorite,
    comments:comments,
    cart: cart,

  },
});
