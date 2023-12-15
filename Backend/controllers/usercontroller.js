const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//signup
const signUp = async (req, res, next) => {
  const {
    email,
    password,
    firstName,
    lastName,
  } = req.body;

  let user;
  try {
    user = new User({
      email,
      password,
      firstName,
      lastName,
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const data = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(data, "blogburst", { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      return res.status(200).json({
        token,
        name: firstName,
        id: user.id,
      });
    });
  } catch (err) {
    return res.status(500).json({
      msg: err,
    });
  }
};

//login
const login = async (req, res, next) => {
  ("login");
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "No user found for this email" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        msg: "Email and password does not match",
      });
    }
    const data = {
      user: {
        id: user.id,
      },
    };
    user.password = undefined;
    jwt.sign(data, "blogburst", { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      return res.status(200).json({
        token,
        firstName: user.firstName,
        lastName: user.lastName,
        id: user.id,
        user: user,
      });
    });
  } catch (err) {
    return res.status(500).json({
      msg: err,
    });
  }
};

//get posts
const getMyPosts = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate("posts");

    return res.status(200).json({ msg: "Posts found", user });
  } catch (err) {
    return res.status(500).json({
      msg: err,
    });
  }
};

exports.signUp = signUp;
exports.login = login;
exports.getMyPosts = getMyPosts;

