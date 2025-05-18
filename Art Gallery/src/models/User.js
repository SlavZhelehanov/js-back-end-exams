import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    gender: {
        type: String,
        required: [true, "The gender's field can't be empty"],
        enum: {
            values: ["male", "female"],
            message: "The gender should be either 'male' or 'female'"
        }
    },
    email: {
        type: String,
        required: [true, "The email's field can't be empty"],
        match: [
            /^[a-z]+@[a-z]+\.[a-z]+$/,
            'The email should be in the following format (mailboxname @ domainname) - "username@domain.bg"'
        ]
    },
    tripsHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "Trip"
        }
    ],
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