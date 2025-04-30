import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, "The first name's field can't be empty"],
        minLength: [1, "The First name should be at leas 1 character long"]
    },
    lastName: {
        type: String,
        required: [true, "The last name's field can't be empty"],
        minLength: [1, "The Last name should be at least 1 character long"]
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
        required: [true, "The password's field can't be empty"]
    }
}, { timestamps: true });

userSchema.pre("save", async function () {
    if (this.password.length === 0) throw ["The password's field can't be empty"];
    if (this.password.length < 5) throw ["The password should be at least 5 characters long"];

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};

export default model("User", userSchema);