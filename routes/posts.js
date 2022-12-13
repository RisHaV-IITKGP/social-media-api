const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");


//create a post
router.post("/", async (req, res) => {
    try {
      const user = await User.findById(req.body.userId);
      if(user) {
        const newPost = new Post(req.body);
        const savedPost = await newPost.save();

        const { password, updatedAt, username, ...other } = user._doc;

        const retValue = {
          postId: savedPost._id,
          title: savedPost.title,
          desc: savedPost.desc,
          createdBy: username,
          createdAt: savedPost.createdAt
        }
        res.status(200).json(retValue);
      } else {
        res.status(400).json("Invalid User Id");
      }
    } catch (err) {
      res.status(500).json(err);
    }
});


//delete a post
router.delete("/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (post.userId === req.body.userId) {
        await post.deleteOne();
        res.status(200).json("the post has been deleted");
      } else {
        res.status(403).json("you can delete only your post");
      }
    } catch (err) {
      res.status(500).json(err);
    }
});


//like a post
router.put("/like/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post.likes.includes(req.body.userId)) {
        await post.updateOne({ $push: { likes: req.body.userId } });
        if(post.dislikes.includes(req.body.userId)) {
            await post.updateOne({ $pull: { dislikes: req.body.userId } });
        }
        res.status(200).json("The post has been liked");
      } else {
        res.status(200).json("The post is already liked");
      }
    } catch (err) {
      res.status(500).json(err);
    }
});


//dislike a post
router.put("/dislike/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post.dislikes.includes(req.body.userId)) {
        await post.updateOne({ $push: { dislikes: req.body.userId } });
        if(post.likes.includes(req.body.userId)) {
            await post.updateOne({ $pull: { likes: req.body.userId } });
        }
        res.status(200).json("The post has been disliked");
      } else {
        res.status(200).json("The post is already disliked");
      }
    } catch (err) {
      res.status(500).json(err);
    }
});

//comment on a post
router.put("/comment/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      await post.updateOne({ $push: { comments: req.body.commentBody } });
      res.status(200).json("Comment has been added");
    } catch (err) {
      res.status(500).json(err);
    }
});


//get a post
router.get("/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      res.status(200).json({
        id: post._id,
        title: post.title,
        desc: post.desc,
        createdAt: post.createdAt,
        likes: post.likes.length,
        comments: post.comments
      });
    } catch (err) {
      res.status(500).json(err);
    }
});


//get timeline posts
router.get("/all_posts/:id", async (req, res) => {
    try {
      const userPosts = await Post.find();
      res.json(userPosts)
    } catch (err) {
      res.status(500).json(err);
    }
});
  
module.exports = router;