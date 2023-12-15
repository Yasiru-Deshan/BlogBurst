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

//get posts
const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().populate("author");

    return res.status(200).json({ msg: "Posts found", posts });
  } catch (err) {
    return res.status(500).json({
      msg: err,
    });
  }
};

//get post by id
const getPostById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const post = await Post.findById(id).populate("author");

    return res.status(200).json({ msg: "Post found", post });
  } catch (err) {
    return res.status(500).json({
      msg: err,
    });
  }
};

//edit post
const updatePost = async (req, res, next) => {
  try {
    const id = req.params.id;
    const post = await Post.findById(id).populate('author');
    
    if (post) 
    {
      if (post.author._id == req.user.id)
      {
        await post.updateOne({ $set: req.body });
        res.status(200).json("Post has been updated.");
      } 
      else 
      {
        res.status(200).json("You are not allowed to edit this post.");
      }
    }
    else
    {
      return res.status(404).json({ msg: "Cannot find a post for this id" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

//delete a post
const deletePost = async (req, res, next) => {
  const id = req.params.id;

  try {
    const post = await Post.findById(id).populate("author");

    if (post) 
    {
      if (post.author._id == req.user.id) 
      {  
        await post.deleteOne();
        res.status(200).json("Post has been deleted.");
      } else {
        res.status(200).json("You are not allowed to remove this post.");
      }
    }
    else
    {
      return res.status(404).json({ msg: "Cannot find a post for this id" });
    }
  } catch (err) {
    return res.status(500).json({
      msg: err,
    });
  }
};

exports.createPost = createPost;
exports.getPosts = getPosts;
exports.getPostById = getPostById;
exports.updatePost = updatePost;
exports.deletePost = deletePost;
