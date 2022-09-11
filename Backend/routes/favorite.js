const express = require("express");
const authentication = require("../middlewares/authentication");

const {
    addToFavorite,
    viewFavorite,
    viewFavoriteByUserId,
    removeFromFavorite,
  emptyFavorite
} = require("../controllers/favorite");

const favoriteListRouter = express.Router();

favoriteListRouter.post("/:book_id", authentication, addToFavorite);
favoriteListRouter.get("/", authentication, viewFavorite);
favoriteListRouter.put("/:book_id", authentication, removeFromFavorite);
favoriteListRouter.get("/:user_id", viewFavoriteByUserId);
favoriteListRouter.delete("/empty", authentication, emptyFavorite);
module.exports = favoriteListRouter;
