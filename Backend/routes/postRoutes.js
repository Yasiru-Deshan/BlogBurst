const express = require("express");
const {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
} = require("../controllers/postController");
const Authentication = require("../middleware/authentication");
const router = express.Router();

router.post("/new", Authentication, createPost);
router.get("/", Authentication, getPosts);
router.get("/:id", Authentication, getPostById);
router.put("/:id", Authentication, updatePost);
router.delete("/:id", Authentication,deletePost);

module.exports = router;
