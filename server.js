const express = require("express");
const dotenv = require("dotenv");
const postsRouter = require("./routers/posts");
const authRouter = require("./routers/auth");
const errorsFormatterMiddleware = require("./middlewares/errorsFormatter");
const multer = require("multer");


dotenv.config();

const port = process.env.PORT || 3002;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use("/", authRouter)
app.use("/posts", postsRouter);

app.use(errorsFormatterMiddleware);
app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
});