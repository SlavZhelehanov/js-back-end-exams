import { Schema, model } from "mongoose";

const cosmeticSchema = new Schema({
    name: {
        type: String,
        required: [true, "The name field can't be empty"],
        minLength: [2, "The name should be at least 2 characters long"]
    },
    skin: {
        type: String,
        required: [true, "The skin field can't be empty"],
        minLength: [10, "The skin should be at least 10 characters long"],
        maxLength: [100, "The skin must be max 100 characters long"]
    },
    description: {
        type: String,
        required: [true, "The description's field can't be empty"],
        minLength: [20, "The description should be at least 20 characters long"],
        maxLength: [200, "The description must be max 200 characters long"]
    },
    ingredients: {
        type: String,
        required: [true, "The ingredients's field can't be empty"],
        minLength: [2, "The ingredients should be at least 2 characters long"],
        maxLength: [50, "The ingredients must be max 50 characters long"]
    },
    benefits: {
        type: String,
        required: [true, "The benefits's field can't be empty"],
        minLength: [10, "The benefits should be at least 10 characters long"],
        maxLength: [100, "The benefits must be max 100 characters long"]
    },
    price: {
        type: Number,
        required: [true, "The price's field can't be empty"],
        min: [1, "The price should be a positive number"]
    },
    image: {
        type: String,
        required: [true, "The image's field can't be empty"],
        match: [/^https?:\/\//, "The image should start with http:// or https://"]
    },
    recommendList: {
        type: [{ type: Schema.Types.ObjectId, ref: "User" }]
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

export default model("Cosmetic", cosmeticSchema);