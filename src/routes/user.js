const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const userData = "firstName lastName age gender about skills";
//Getting all the pending requests of loggedIn user
userRouter.get("/user/requests/received", userAuth, async(req, res) => {
    try{
        const loggedInUser = req.user;

        const requests = await ConnectionRequest.find({
            toUserId : loggedInUser._id,
            status : "interested"
        }).populate(
            "fromUserId",
            userData);
            // ["firstName", "lastName"]);

        res.json({
            message: "Data fetched successfully",
            data: requests,
        });

    }
    catch(err) {
        res.status(404).send("Error : " + err.message);
    }
});

//Getting all connected users
userRouter.get("/user/connections", userAuth, async(req, res) => {
    try{
        const loggedInUser = req.user;
        const connections = await ConnectionRequest.find({
            $or: [
                {fromUserId : loggedInUser._id, status : "accepted"},
                {toUserId : loggedInUser._id, status : "accepted"},
            ]
        })
        .populate("fromUserId", userData)
        .populate("toUserId", userData);

        console.log(connections);
        const data = connections.map((row) => {
            if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
                return row.toUserId;
            }
            return row.fromUserId;
            // row.fromUserId;
        });

        console.log(data);

        res.json({message: "People connected with you", data : data});
    }
    catch(err) {
        res.status(404).send("Error : " + err.message);
    }
});

module.exports = userRouter;