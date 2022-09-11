const express = require("express");
const authentication = require("../middlewares/authentication");

const {
    addComments,
    viewComments,
    removeComments,
    viewCommentsByRoomId
} = require("../controllers/comments");

const commentsRouter = express.Router();

commentsRouter.post("/:room_id", authentication, addComments);
commentsRouter.get("/", authentication, viewComments);
commentsRouter.put("/:room_id", authentication, removeComments);
commentsRouter.get("/:room_id", authentication, viewCommentsByRoomId);

module.exports = commentsRouter;
