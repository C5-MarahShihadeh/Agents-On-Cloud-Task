const express = require("express");

const {
  getAllbook,
  createNewbook,
  deletebookById,
  updatebookById,
  getbooksByTitle,
  getAllbooksss
} = require("../controllers/books");

const bookRouter = express.Router();

bookRouter.get("/", getAllbook);
bookRouter.get("/books", getAllbooksss);
bookRouter.post("/", createNewbook);
bookRouter.put("/:id", deletebookById);
bookRouter.put("/update/:id", updatebookById);
bookRouter.get("/search", getbooksByTitle);

module.exports = bookRouter;
