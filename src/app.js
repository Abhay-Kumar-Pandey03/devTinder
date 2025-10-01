const express = require('express');

const app = express();

const { adminAuth, userAuth } = require("./midlewares/auth.js");

//Handle Auth Middleware for GET requests

app.use("/admin", adminAuth);

app.get("/admin/data", (req, res) => {
    res.send("Admin data accessed successfully");
});

app.get("/user/data", userAuth, (req, res) => {
    res.send("User data sent successfully");
});

app.post("/user/login", (req, res) => {
    res.send("User logged in successfully");
});



app.listen(3000, () =>{
    console.log("Server is successfully running on port 3000");
});






