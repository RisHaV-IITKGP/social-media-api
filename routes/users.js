const User = require("../models/User");
const router = require("express").Router();

//get a user
router.get("/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if(user) {
        const { password, updatedAt, ...other } = user._doc;

        const retValue = {
          username: other.username,
          followers: other.followers.length,
          followings: other.followings.length
        };
        res.status(200).json(retValue);
      } else {
        res.status(400).json("User not found !")
      }
    } catch (err) {
      res.status(500).json(err);
    }
});


//follow a user
router.put("/follow/:id", async (req, res) => {
    if (req.body.userId !== req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if (!user.followers.includes(req.body.userId)) {
          await user.updateOne({ $push: { followers: req.body.userId } });
          await currentUser.updateOne({ $push: { followings: req.params.id } });
          res.status(200).json("user has been followed");
        } else {
          res.status(403).json("you already follow this user");
        }
      } catch (err) {
        res.status(500).json("Invalid User");
      }
    } else {
      res.status(403).json("you cant follow yourself");
    }
});


//unfollow a user
router.put("/unfollow/:id", async (req, res) => {
    if (req.body.userId !== req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if (user.followers.includes(req.body.userId)) {
          await user.updateOne({ $pull: { followers: req.body.userId } });
          await currentUser.updateOne({ $pull: { followings: req.params.id } });
          res.status(200).json("user has been unfollowed");
        } else {
          res.status(403).json("you dont follow this user");
        }
      } catch (err) {
        res.status(500).json("Invalid User");
      }
    } else {
      res.status(403).json("you cant unfollow yourself");
    }
});


module.exports = router