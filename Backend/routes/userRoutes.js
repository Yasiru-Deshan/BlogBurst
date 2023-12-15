const express = require("express");
const {
  signUp,
  login,
  getMyPosts
} = require("../controllers/userController");
const Authentication = require("../middleware/authentication");
const router = express.Router();

router.post("/", signUp);
router.post("/login", login);
router.get("/my_blogs", Authentication, getMyPosts);

module.exports = router;
