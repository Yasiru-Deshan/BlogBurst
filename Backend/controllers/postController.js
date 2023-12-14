const User = require("../models/user");
const Post = require("../models/post");

//create posts
const createPost = async (req, res, next) => {
  try {
    const user = User.findById(req.user.id);

    const newPost = new Post({
      author: req.user.id,
      image: req.body.image,
      title: req.body.title,
      content: req.body.content,
    });

    await user.updateOne({
      $push: { posts: [newPost] },
    });
    await newPost.save();
    res.status(200).json("Post Created");
  } catch (err) {
    res.status(500).json(err);
  }
};

const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();

    return res.status(200).json({ msg: "Posts found", posts });
  } catch (err) {
    return res.status(500).json({
      msg: err,
    });
  }
};

exports.createPost = createPost;
exports.getPosts = getPosts;
