const express = require("express");
const requestRouter = express.Router();
// const User = require("./models/user");
const {userAuth} = require("../middlewares/auth");

requestRouter.post("/sendConnectionRequest", userAuth, async(req, res, next) =>{
    try{
    const user = req.user;
    if(!user){
        throw new Error("User not found");
    }

    res.send(user.firstName + " sent a connection request");
    }
    catch(err) {
    res.status(400).send("Error: " + err.message);
    }
});

module.exports = requestRouter;