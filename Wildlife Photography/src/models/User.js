import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "The username's field can't be empty"],
        minLength: [4, "The username should be at least 4 characters long"]
    },
    address: {
        type: String,
        required: [true, "The address's field can't be empty"],
        maxLength: [20, "The address should be a maximum of 20 characters long"]
    },
    myPublications: [
        {
            type: Schema.Types.ObjectId,
            ref: "Publication"
        }
    ],
    password: {
        type: String,
        required: [true, "The password's field can't be empty"]
    }
}, { timestamps: true });

userSchema.pre("save", async function () {
    if (this.password.length === 0) throw ["The password's field can't be empty"];
    if (this.password.length < 3) throw ["The password should be at least 3 characters long"];

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};

export default model("User", userSchema);