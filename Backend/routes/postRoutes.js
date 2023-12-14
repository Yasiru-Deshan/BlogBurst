const express = require("express");
const {
  createPost,
  getPosts,
} = require("../controllers/postController");
const Authentication = require("../middleware/authentication");
const router = express.Router();

router.post("/new", Authentication, createPost);
router.get("/", Authentication, getPosts);

module.exports = router;
