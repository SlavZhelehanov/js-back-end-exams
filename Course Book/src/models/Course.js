import { Schema, model } from "mongoose";

const courseSchema = new Schema({
    title: {
        type: String,
        required: [true, "The title field can't be empty"],
        minLength: [5, "The Title should be at least 5 characters long"]
    },
    type: {
        type: String,
        required: [true, "The type field can't be empty"],
        minLength: [3, "The Type should be at least 3 characters long"]
    },
    certificate: {
        type: String,
        required: [true, "The certificate's field can't be empty"],
        minLength: [2, "The Certificate should be at least 2 characters long"]
    },
    image: {
        type: String,
        required: [true, "The image's field can't be empty"],
        match: [/^https?:\/\//, "The Image should start with http:// or https://"]
    },
    description: {
        type: String,
        required: [true, "The description's field can't be empty"],
        minLength: [10, "The description should be at least 10 characters long"]
    },
    price: {
        type: Number,
        required: [true, "The price's field can't be empty"],
        min: [1, "The price should be a positive number"]
    },
    signUpList: {
        type: [{ type: Schema.Types.ObjectId, ref: "User" }]
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

export default model("Course", courseSchema);