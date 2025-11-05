const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");

//Sign up a user
authRouter.post("/signup", async (req, res) => {
  //Validation
    validateSignUpData(req);

    const {firstName, lastName, emailId, password} = req.body;

  //Encryption of password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

  //Creating an instance of User model
    const user = new User({
    firstName,
    lastName,
    emailId,
    password: passwordHash,
    });

    try {
    await user.save();
    res.send("User signed up successfully");
    } catch (err) {
    res.status(400).send("Error in signing up the user: " + err.message);
    }
});

//Login
authRouter.post("/login", async(req, res) => {
    const{emailId, password} = req.body;

    try {
    const user = await User.findOne({ emailId : emailId})

    if(!user){
        throw new Error("Wrong credentials");
    }

    const isValidPassword = await user.validatePassword(password);

    if(isValidPassword){

      //Creating a JWT token
        const token = await user.getJWT();

      //Add the token to cookie and send the response back to the user
      res.cookie("token", token, {expires: new Date(Date.now() + 8 * 3600000),});
        res.send("Login Successfull");
    }
    else{
        throw new Error("Invalid Credentials");
    }


    } catch (err) {
    res.status(400).send("Error : " + err.message);
    }
});


module.exports = authRouter;