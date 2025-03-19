import { Schema, model } from "mongoose";

const stoneSchema = new Schema({
    name: {
        type: String,
        required: [true, "The name's field can't be empty"],
        minLength: [2, "The Name should be at least 2 characters"]
    },
    category: {
        type: String,
        required: [true, "The category's field can't be empty"],
        minLength: [3, "The Category should be at least 3 characters"]
    },
    color: {
        type: String,
        required: [true, "The color's field can't be empty"],
        minLength: [0, "The Color should be at least 2 characters"]
    },
    image: {
        type: String,
        required: [true, "The image's field can't be empty"],
        match: [/^https?:\/\//, "The stone Image should start with http:// or https://"]
    },
    location: {
        type: String,
        required: [true, "The location's field can't be empty"],
        minLength: [5, "The Location should be between 5 and 15 characters"],
        maxLength: [15, "The Location should be between 5 and 15 characters"]
    },
    formula: {
        type: String,
        required: [true, "The formulas's field can't be empty"],
        minLength: [3, "The Formula should be between 3 and 30 characters"],
        maxLength: [30, "The Formula should be between 3 and 30 characters"]
    },
    description: {
        type: String,
        required: [true, "The description's field can't be empty"],
        minLength: [10, "The Description should be a minimum of 10 characters long"]
    },
    likedList: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

export default model("Stone", stoneSchema);