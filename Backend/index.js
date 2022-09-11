const express = require("express");
require("dotenv").config();
const cors = require("cors");
require("./models/db");

//routers
const bookRouter = require("./routes/books");
const commentsRouter = require("./routes/comments");
const favoriteListRouter = require("./routes/favorite");
const cartRouter = require("./routes/cart");

const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");

const roleRouter = require("./routes/roles");
const permissionRouter = require("./routes/permission");

const app = express();

//built-in middleware
app.use(express.json());
app.use(cors());

// router middleware
app.use("/signup", registerRouter);
app.use("/login", loginRouter);

app.use("/roles", roleRouter);
app.use("/permission", permissionRouter);

app.use("/book", bookRouter);
app.use("/comments", commentsRouter);
app.use("/favorite", favoriteListRouter);
app.use("/cart", cartRouter);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server on ${PORT}`);
});
