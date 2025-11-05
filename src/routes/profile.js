const express = require("express");
const profileRouter = express.Router();
const {userAuth} = require("../middlewares/auth");

//Get profile
profileRouter.get("/profile", userAuth, async(req, res) => {
    try{
    const user = req.user;
    if(!user){
    throw new Error("User not found");
    }
    res.send(user.firstName + " " + user.lastName);
    }
    catch(err) {
    res.status(400).send("Error : " + err.message);
    }
});

module.exports = profileRouter;