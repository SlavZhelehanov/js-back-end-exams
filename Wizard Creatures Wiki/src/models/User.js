import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, "The first name's field can't be empty"],
        minLength: [3, "The First name should be at least 3 characters long"]
    },
    lastName: {
        type: String,
        required: [true, "The last name's field can't be empty"],
        minLength: [3, "The Last name should be at least 3 characters long"]
    },
    email: {
        type: String,
        required: [true, "The email's field can't be empty"],
        minLength: [10, "The email should be at least 10 characters long"]
    },
    password: {
        type: String,
        required: [true, "The password's field can't be empty"]
    }
}, { timestamps: true });

userSchema.pre("save", async function () {
    if (this.password.length === 0) throw ["The password's field can't be empty"];
    if (this.password.length < 4) throw ["The password should be at least 4 characters long"];

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};

export default model("User", userSchema);