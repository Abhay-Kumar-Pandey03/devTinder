const express = require('express');

const app = express();

// app.use("/hello",(req,res) => {
//     res.send( "Hello hello server"); // Request handler
// });

app.get("/user", (req,res) => {
    console.log(req.query);
    res.send("Get user API called with query params");
    // res.send({firstname: "John", lastname: "Doe"});
});

app.get("/user/:userID/:name/:password", (req,res) => {
    console.log(req.params);
    res.send("Get user API called with dynamic route");
    // res.send({firstname: "John", lastname: "Doe"});
});

app.get("/user", (req,res) => {
    console.log(res.params);
    res.send("Get user API called");
    // res.send({firstname: "John", lastname: "Doe"});
});

app.post("/user", (req,res) => {
    res.send("Post user API called");
    // res.send({firstname: "John", lastname: "Doe"});
});

app.put("/user", (req,res) => {
    res.send("Put user API called");
    // res.send({firstname: "John", lastname: "Doe"});
});

app.patch("/user", (req,res) => {
    res.send("Patch user API called");
    // res.send({firstname: "John", lastname: "Doe"});
});

app.delete("/user", (req,res) => {
    res.send("Delete user API called");
    // res.send({firstname: "John", lastname: "Doe"});
});

// use - This will match all the HTTP method API to /test
app.use("/test",(req,res) => {
    res.send( "Hello from server"); // Request handler
});

// app.use("/",(req,res) => {
//     res.send( "Hello from dashboard"); // Request handler
// });


app.listen(3000, () =>{
    console.log("Server is successfully running on port 3000");
});






