const router = require('express').Router();
const { User } = require('../../models');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate user input
    if (!(username && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({where: { username }, raw:true});

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { id: user.id, username },
        process.env.TOKEN_KEY
      );

      // save user token
      user.token = token
      const {password, ...others} = user;

      // user
      res.status(200).json(others);
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
})


module.exports = router;