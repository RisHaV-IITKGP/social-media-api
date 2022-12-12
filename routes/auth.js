
const router = require("express").Router();
const User = require("../models/User");

//REGISTER
router.get("/register", async (req, res) => {
    //create new user
    const user = await new User({
    username: "john",
    password: "john123"
    });

    //save user and respond
    await user.save();
    res.send("User registered");
});


//LOGIN
router.post("/login", async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      !user && res.status(404).json("user not found");
  
      const validPassword = (req.body.password == user.password)
      !validPassword && res.status(400).json("wrong password")
  
      res.status(200).json(user)
    } catch (err) {
      res.status(500).json(err)
    }
  });

module.exports = router