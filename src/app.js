const express = require("express");

const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");
const validator = require("validator");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");

app.use(express.json());

//Sign up a user
app.post("/signup", async (req, res) => {
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

app.post("/login", async(req, res) => {
  const{emailId, password} = req.body;

  try {
    const user = await User.findOne({ emailId : emailId})

    if(!user){
      throw new Error("Wrong credentials");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if(!isValidPassword){
      throw new Error("Wrong credentials");
    }
    else{
      res.status(200).send("Login successful");
    }


  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
})

connectDB()
  .then(() => {
    console.log("Database connected successfully");

    app.listen(3000, () => {
      console.log("Server is successfully running on port 3000");
    });
  })
  .catch((err) => {
    console.log("Database cannot be connected !!");
  });
