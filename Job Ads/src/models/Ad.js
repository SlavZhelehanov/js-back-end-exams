import { Schema, model } from "mongoose";

const adSchema = new Schema({
    headline: {
        type: String,
        required: [true, "The headline's field can't be empty"],
        minLength: [4, "The headline should be at least 4 characters"]
    },
    location: {
        type: String,
        required: [true, "The location's field can't be empty"],
        minLength: [8, "The Location should be at least 8 characters"]
    },
    company: {
        type: String,
        required: [true, "The company's name field can't be empty"],
        minLength: [3, "The Company name should be at least 3 characters"]
    },
    description: {
        type: String,
        required: [true, "The company description's field can't be empty"],
        minLength: [40, "The Company description should be a minimum of 40 characters long"]
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    usersApplied: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }]
}, { timestamps: true });

export default model("Ad", adSchema);