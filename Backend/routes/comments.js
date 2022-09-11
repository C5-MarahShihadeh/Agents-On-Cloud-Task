const express = require("express");
const authentication = require("../middlewares/authentication");

const {
    addComments,
    viewComments,
    removeComments,
    viewCommentsByBookId
} = require("../controllers/comments");

const commentsRouter = express.Router();

commentsRouter.post("/:book_id", authentication, addComments);
commentsRouter.get("/", authentication, viewComments);
commentsRouter.put("/:id", authentication, removeComments);
commentsRouter.get("/:book_id", authentication, viewCommentsByBookId);

module.exports = commentsRouter;
