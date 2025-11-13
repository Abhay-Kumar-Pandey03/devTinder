
const validator = require("validator");

const validateSignUpData = (req) => {
    const data = req.body;

    if (data?.firstName && data.firstName.length > 30) {
        throw new Error("First name cannot exceed 30 characters");
    }

    if (data?.lastName && data.lastName.length > 30) {
        throw new Error("Last name cannot exceed 30 characters");
    }

    if(data?.emailId && !validator.isEmail(data.emailId)){
        throw new Error("Invalid Email ID");
    }

    if (data?.password && !validator.isStrongPassword(data.password)) {
        throw new Error("Please enter a strong password")
    }

    if (data?.age && data.age < 18) {
        throw new Error("Age must be at least 18");
    }
    
    if (typeof data?.age === "number" && data?.age > 100) {
        throw new Error("Age cannot be more than 100");
    }

    if( data?.gender && !["male", "female", "other"].includes(data.gender.toLowerCase())){
        throw new Error("Entered wrong gender!!")
    }
    
    if (typeof data?.photoUrl === "string") {
        const trimmedUrl = data.photoUrl.trim();
        
        if (trimmedUrl === "") {
            throw new Error("Photo URL cannot be empty");
        }
    }
    
    if (!validator.isURL(trimmedUrl)) {
        throw new Error("Invalid photo URL");
    }
    
    if (data?.about && data.about.length > 500) {
        throw new Error("About section cannot exceed 500 characters");
    }
    
    if (data?.skills.length > 10) {
        throw new Error("Skills cannot be more than 10");
    }
}

const validateEditProfileData = (req) => {

    const allowedEdits = [ "firstName", "lastName", "about", "skills", "gender", "age", "photoUrl"];

    const isEditAllowed = Object.keys(req.body).every((field) => allowedEdits.includes(field));

    return isEditAllowed;
};

module.exports =  {
    validateSignUpData,
    validateEditProfileData,
};
