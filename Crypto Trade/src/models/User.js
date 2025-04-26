import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "The username field can't be empty"],
        minLength: [5, "The username should be at least 5 characters long"]
    },
    email: {
        type: String,
        required: [true, "The email field can't be empty"],
        minLength: [10, "The email should be at least 10 characters long"]
    },
    password: {
        type: String,
        required: [true, "Password field can't be empty"],
    }
});

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        if (this.password.length < 4) {
            return next(new Error("The password should be at least 4 characters long"));
        }

        try {
            this.password = await bcrypt.hash(this.password, 10);
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
});

userSchema.methods.comparePassword = function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};

export default model("User", userSchema);