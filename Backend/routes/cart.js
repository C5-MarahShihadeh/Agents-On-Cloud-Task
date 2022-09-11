const express = require("express");
const authentication = require("../middlewares/authentication");

const {
  addAndUpdateToCart,
  viewCart,
  removefromcart,
  removeAndDecreas,
  emptyCart
} = require("../controllers/cart");

const cartRouter = express.Router();

cartRouter.post("/:book_id", authentication, addAndUpdateToCart);
cartRouter.get("/", authentication, viewCart);
cartRouter.put("/:book_id", authentication, removefromcart);
cartRouter.put("/cart/:book_id", authentication, removeAndDecreas);
cartRouter.delete("/empty",authentication,emptyCart);
module.exports = cartRouter;
