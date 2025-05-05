import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    skills: {
        type: String,
        required: [true, "The descriptions of skills field can't be empty"],
        minLength: [40, "The descriptions of skills should be at least 40 characters long"]
    },
    email: {
        type: String,
        required: [true, "The email's field can't be empty"],
        validate: {
            validator: function (value) {
                // Regex: only letters allowed in name, domain, and extension
                return /^[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]+$/.test(value);
            },
            // message: props => `${props.value} is not a valid email format.`
            message: props => `A valid email format is <name>@<domain>.<extension>`
        }
    },
    password: {
        type: String,
        required: [true, "Password field can't be empty"],
    },
    myAds: [{
        type: Schema.Types.ObjectId,
        ref: "Ad"
    }]
});

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        if (this.password.length < 5) {
            return next(new Error("The password should be at least 5 characters long"));
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