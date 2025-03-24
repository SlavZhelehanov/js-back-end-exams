import { Schema, model } from "mongoose";

const electronicSchema = new Schema({
    name: {
        type: String,
        required: [true, "The name's field can't be empty"],
        minLength: [10, "The Name should be at least 10 characters long"]
    },
    type: {
        type: String,
        required: [true, "The type's field can't be empty"],
        minLength: [2, "The Type should be at least 2 characters long"]
    },
    damages: {
        type: String,
        required: [true, "The damages's field can't be empty"],
        minLength: [10, "The Damages should be at least 10 characters long"]
    },
    image: {
        type: String,
        required: [true, "The iamge's field can't be empty"],
        match: [/^https?:\/\//, "The Image should start with http:// or https://"]
    },
    description: {
        type: String,
        required: [true, "The description's field can't be empty"],
        minLength: [10, "The Description should be between 10 and 200 characters long"],
        maxLength: [200, "The Description should be between 10 and 200 characters long"]
    },
    production: {
        type: Number,
        required: [true, "The productions's field can't be empty"],
        min: [1900, "The production should be between 1900 and 2023."],
        max: [2023, "The production should be between 1900 and 2023."]
    },
    exploitation: {
        type: Number,
        required: [true, "The exploitation's field can't be empty"],
        min: [1, "The exploitation should be a positive number."]
    },
    price: {
        type: Number,
        required: [true, "The price's field can't be empty"],
        min: [1, "The Price should be a positive number"]
    },
    buyingList: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

export default model("electronic", electronicSchema);