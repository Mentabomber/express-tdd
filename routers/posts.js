const express = require("express");
const router = express.Router();
const postsController = require("../controllers/posts");
const multer = require("multer");
const pswCheckMiddleware = require("../middlewares/pswCheck")

router.use(pswCheckMiddleware);


const uploader = multer({dest: "public/assets/imgs/posts"})

router.get("/", postsController.index);

router.post("/", uploader.single("image"), postsController.store);

router.get("/create", postsController.create);

router.get("/:slug",postsController.show);

router.get("/:slug/download", postsController.download);

router.delete("/:slug/destroy",postsController.destroy);

// router.get("/create", postsController.create);

// router.get("/:slug/download", postsController.download);

module.exports = router;