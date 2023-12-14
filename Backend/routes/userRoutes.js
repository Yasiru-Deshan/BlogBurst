const express = require("express");
const {
  signUp,
  login,
} = require("../controllers/userController");
const Authentication = require("../middleware/authentication");
const router = express.Router();

router.post("/", signUp);
router.post("/login", login);

module.exports = router;