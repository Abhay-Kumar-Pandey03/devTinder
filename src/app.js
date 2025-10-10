const express = require('express');

const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");

app.post("/signup", async (req, res) => {
    const user = new User({
      firstName: "Virat",
      lastName: "Kohli",
      emailId: "virat@kohli.in",
      password: "virat123",
      age: 34,
      gender: "male",
    });

    try{
      await user.save();
      res.send("User signed up successfully");
    }
    catch(err) {
      res.status(400).send("Error in signing up the user" + err,message);
    }

});




connectDB()
  .then(() => {
    console.log("Database connected successfully");

    app.listen(3000, () =>{
    console.log("Server is successfully running on port 3000");
  });
})
  .catch((err) => {
    console.log("Database cannot be connected !!");
  });











