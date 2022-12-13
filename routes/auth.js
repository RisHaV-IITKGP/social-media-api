
const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

//REGISTER
// router.get("/register", async (req, res) => {
//     //create new user
//     const user = await new User({
//     username: "light_Y",
//     email: "light@gmail.com",
//     password: "kira123"
//     });

//     //save user and respond
//     await user.save();
//     res.send("User registered");
// });


//Authenticate
router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.find({email: email, password: password});

    if (user.length > 0) {
      //Generate an access token
      const accessToken = jwt.sign({ 
        id: user[0].id, 
        email: user[0].email, 
        username: user[0].username }, 
        process.env.SECRET_KEY);

      res.json({
        username: user[0].username,
        email: user[0].email,
        accessToken
      });
    } else {
      res.status(400).json("Username or password incorrect!");
    }
  } catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router