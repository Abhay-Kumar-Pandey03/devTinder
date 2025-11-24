const validator = require("validator");

const validateSignUpData = (req, res, next) => {
    const data = req.body;

    /* ================== FIRST NAME ================== */
    if (
        !data.firstName ||
        data.firstName.trim().length < 2 ||
        data.firstName.trim().length > 30
    ) {
        return res.status(400).json({
            message: "First name must be between 2 and 30 characters",
        });
    }

    if (!/^[A-Za-z]+$/.test(data.firstName)) {
        return res.status(400).json({
            message: "First name should contain only letters",
        });
    }

    /* ================== LAST NAME ================== */
    if (
        !data.lastName ||
        data.lastName.trim().length < 2 ||
        data.lastName.trim().length > 30
    ) {
        return res.status(400).json({
            message: "Last name must be between 2 and 30 characters",
        });
    }

    if (!/^[A-Za-z]+$/.test(data.lastName)) {
        return res.status(400).json({
            message: "Last name should contain only letters",
        });
    }

    /* ================== EMAIL ================== */
    if (!data?.emailId || !validator.isEmail(data.emailId)) {
        return res.status(400).json({
            message: "Invalid Email ID",
        });
    }

    /* ================== PASSWORD ================== */
    if (!data?.password || !validator.isStrongPassword(data.password)) {
        return res.status(400).json({
            message:
                "Password must contain uppercase, lowercase, number & special character (at least 8 characters)",
        });
    }

    /* ================== AGE ================== */
    if (data.age !== undefined) {
        if (!/^\d+$/.test(data.age)) {
            return res.status(400).json({
                message: "Age must contain only numbers",
            });
        }

        const age = Number(data.age);

        if (age < 18 || age > 100) {
            return res.status(400).json({
                message: "Age must be between 18 and 100",
            });
        }

        data.age = age; // ✅ convert before mongoose
    }

    /* ================== GENDER ================== */
    if (
        data?.gender &&
        !["male", "female", "other"].includes(data.gender.toLowerCase())
    ) {
        return res.status(400).json({
            message: "Entered wrong gender",
        });
    }

    /* ================== PHOTO ================== */
    if (typeof data?.photoUrl === "string") {
        const trimmedUrl = data.photoUrl.trim();

        if (trimmedUrl === "") {
            return res.status(400).json({
                message: "Photo URL cannot be empty",
            });
        }

        if (!validator.isURL(trimmedUrl)) {
            return res.status(400).json({
                message: "Invalid photo URL",
            });
        }
    }

    /* ================== BIO ================== */
    if (data.about) {
        const about = data.about.trim();

        if (about.length < 10 || about.length > 300) {
            return res.status(400).json({
                message: "Bio must be between 10 and 300 characters",
            });
        }
    }

    /* ================== SKILLS ================== */
    if (Array.isArray(data.skills) && data.skills.length > 10) {
        return res.status(400).json({
            message: "Skills cannot be more than 10",
        });
    }

    next(); // ✅ Pass to controller if all validations pass
};

const validateEditProfileData = (req) => {
    const data = req.body;

    const allowedEdits = [
        "firstName",
        "lastName",
        "about",
        "skills",
        "gender",
        "age",
        "photoUrl",
    ];

    // 1. Only allow valid fields
    const isEditAllowed = Object.keys(data).every((field) =>
        allowedEdits.includes(field)
    );

    if (!isEditAllowed) return "Invalid field in request";

    /* ========== FIRST NAME ========== */
    if (data.firstName) {
        if (data.firstName.trim().length < 2 || data.firstName.trim().length > 30) {
            return "First name must be between 2 and 30 characters";
        }

        if (!/^[A-Za-z]+$/.test(data.firstName)) {
            return "First name should contain only letters";
        }
    }

    /* ========== LAST NAME ========== */
    if (data.lastName) {
        if (data.lastName.trim().length < 2 || data.lastName.trim().length > 30) {
            return "Last name must be between 2 and 30 characters";
        }

        if (!/^[A-Za-z]+$/.test(data.lastName)) {
            return "Last name should contain only letters";
        }
    }

    /* ========== AGE ========== */
    if (data.age !== undefined) {
        if (!/^\d+$/.test(data.age)) {
            return "Age must contain only numbers";
        }

        const age = Number(data.age);

        if (age < 18 || age > 100) {
            return "Age must be between 18 and 100";
        }

        // ✅ convert to number before mongoose
        data.age = age;
    }

    /* ========== BIO ========== */
    if (data.about) {
        if (data.about.trim().length < 10 || data.about.trim().length > 300) {
            return "Bio must be between 10 and 300 characters";
        }
    }

    /* ========== GENDER ========== */
    if (data.gender) {
        if (!["male", "female", "other"].includes(data.gender.toLowerCase())) {
            return "Entered wrong gender";
        }
    }

    /* ========== SKILLS ========== */
    if (Array.isArray(data.skills) && data.skills.length > 10) {
        return "Skills cannot be more than 10";
    }

    return null; // ✅ Everything is valid
};


module.exports = {
    validateSignUpData,
    validateEditProfileData,
};
