const express = require('express');

const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");
app.use(express.json());


app.post("/signup", async (req, res) => {
    
  //Creating an instance of User model
  const user = new User(req.body);

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











