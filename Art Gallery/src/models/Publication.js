import { Schema, model } from "mongoose";

const publicationSchema = new Schema({
    title: {
        type: String,
        required: [true, "The title's field can't be empty"],
        minLength: [6, "The title should be at least 6 characters long"]
    },
    paintingTechnique: {
        type: String,
        required: [true, "The painting technique's field can't be empty"],
        maxLength: [15, "The painting technique should be a maximum of 15 characters long"]
    },
    picture: {
        type: String,
        required: [true, "The art picture's field can't be empty"],
        match: [/^https?:\/\//, "The art picture should start with http:// or https://"]
    },
    certificate: {
        type: String,
        required: [true, "The certificate's field can't be empty"],
        enum: {
            values: ["Yes", "No"],
            message: "The certificate should be select between 'Yes' or 'No'"
        }
    },
    usersShared : {
        type: [{ type: Schema.Types.ObjectId, ref: "User" }]
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

export default model("Publication", publicationSchema);