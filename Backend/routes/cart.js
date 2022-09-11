const express = require("express");
const authentication = require("../middlewares/authentication");

const {
  addAndUpdateToCart,
  viewCart,
  removefromcart,
  removeAndDecreas,
  emptyCart
} = require("../controllers/cart");

const basketRouter = express.Router();

basketRouter.post("/:book_id", authentication, addAndUpdateToCart);
basketRouter.get("/", authentication, viewCart);
basketRouter.put("/:book_id", authentication, removefromcart);
basketRouter.put("/cart/:book_id", authentication, removeAndDecreas);
basketRouter.delete("/empty",authentication,emptyCart);
module.exports = basketRouter;
