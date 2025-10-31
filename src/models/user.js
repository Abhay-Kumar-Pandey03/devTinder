
const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 30,
    },

    lastName: {
        type: String,
        trim: true,
        maxLength: 30,
    },

    emailId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email ID");
            }
        }
    },

    password: {
        type: String,
        minLength: 8,
        maxLength: 16,
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Password is not strong enough");
            }
        }
    },

    age: {
        type: Number,
        min: 18,
        

    },

    gender: {
        type: String,
        minLength: 4,
        maxLength: 6,
        validate(value) {
            if(!["male", "female", "other"].includes(value.toLowerCase())){
                throw new Error("Entered wrong gender!!")
            }
        }
    },

    photoUrl: {
        type: String,
        trim: true,
        default: "https://www.shutterstock.com/image-vector/default-avatar-social-media-display-picture-2632690107",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid URL for photo");
            }
        }
    },

    about: {
        type: String,
        maxLength: 500,
        
    },

    skills: {
        type: [String],
    }

});

const User = mongoose.model("User", userSchema);

module.exports = User;