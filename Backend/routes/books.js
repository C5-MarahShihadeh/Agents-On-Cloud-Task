const express = require("express");

const {
  getAllbook,
  createNewbook,
  deletebookById,
  updatebookById,
  getbooksByTitle,
  getAllbooksss,
  getBookById
} = require("../controllers/books");

const bookRouter = express.Router();

bookRouter.get("/", getAllbook);
bookRouter.get("/books", getAllbooksss);
bookRouter.post("/", createNewbook);
bookRouter.put("/:id", deletebookById);
bookRouter.put("/update/:id", updatebookById);
bookRouter.get("/search", getbooksByTitle);
bookRouter.get("/:id", getBookById);

module.exports = bookRouter;
