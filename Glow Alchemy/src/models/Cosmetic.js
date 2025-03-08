import { Schema, model } from "mongoose";

const cosmeticSchema = new Schema({
    name: {
        type: String,
        required: [true, "The name field can't be empty"],
        minLength: [2, "The name should be at least 2 characters long"],
        maxLength: [20, "The name should be max 20 characters long"]
    },
    skin: {
        type: String,
        required: [true, "The skin field can't be empty"],
        minLength: [10, "The email should be at least 10 characters long"]
    },
    description: {
        type: String,
        required: [true, "The description's field can't be empty"],
    },
    ingredients: {
        type: String,
        required: [true, "The ingredients's field can't be empty"],
    },
    benefits: {
        type: String,
        required: [true, "The benefits's field can't be empty"],
    },
    price: {
        type: String,
        required: [true, "The price's field can't be empty"],
    },
    image: {
        type: String,
        required: [true, "The image's field can't be empty"],
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