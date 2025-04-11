import { Schema, model } from "mongoose";

const gameSchema = new Schema({
    name: {
        type: String,
        required: [true, "The name's field can't be empty"],
        minLength: [4, "The Name should be at least 4 characters"]
    },
    image: {
        type: String,
        required: [true, "The image's field can't be empty"],
        match: [/^https?:\/\//, "The game Image should start with http:// or https://"]
    },
    price: {
        type: Number,
        required: [true, "The price's field can't be empty"],
        min: [0, "The Price should be a positive number"]
    },
    description: {
        type: String,
        required: [true, "The description's field can't be empty"],
        minLength: [10, "The Description should be a minimum of 10 characters long"]
    },
    genre: {
        type: String,
        required: [true, "The genre's field can't be empty"],
        minLength: [2, "The Genre should be at least 2 characters long."]
    },
    platform: {
        type: String,
        required: [true, "The platform's field can't be empty"],
        enum: {
            values: ["PC", "Nintendo", "PS4", "PS5", "XBOX"],
            message: "The Platform should be select between PC, Nintendo, PS4, PS5, or XBOX"
        }
    },
    boughtBy: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

export default model("Game", gameSchema);