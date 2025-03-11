import { Schema, model } from "mongoose";

const deviceSchema = new Schema({
    brand: {
        type: String,
        required: [true, "The brand field can't be empty"],
        minLength: [2, "The brand should be at least 2 characters long"]
    },
    model: {
        type: String,
        required: [true, "The model field can't be empty"],
        minLength: [5, "The model should be at least 5 characters long"]
    },
    hdd: {
        type: String,
        required: [true, "The hard disk's field can't be empty"],
        minLength: [5, "The hard disk should be at least 5 characters long"]
    },
    screenSize: {
        type: String,
        required: [true, "The screen size's field can't be empty"],
        minLength: [1, "The screen size should be at least 1 characters long"]
    },
    ram: {
        type: String,
        required: [true, "The RAM's field can't be empty"],
        minLength: [2, "The RAM should be at least 2 characters long"]
    },
    os: {
        type: String,
        required: [true, "The operating system's field can't be empty"],
        minLength: [5, "The operating system should be at least 5 characters long"],
        maxLength: [20, "The operating system must be max 20 characters long"]
    },
    cpu: {
        type: String,
        required: [true, "The CPU's field can't be empty"],
        minLength: [10, "The CPU should be at least 10 characters long"],
        maxLength: [50, "The CPU must be max 50 characters long"]
    },
    gpu: {
        type: String,
        required: [true, "The GPU's field can't be empty"],
        minLength: [10, "The GPU should be at least 10 characters long"],
        maxLength: [50, "The GPU must be max 50 characters long"]
    },
    price: {
        type: Number,
        required: [true, "The price's field can't be empty"],
        min: [1, "The price should be a positive number"]
    },
    color: {
        type: String,
        required: [true, "The color's field can't be empty"],
        minLength: [2, "The color should be at least 2 characters long"],
        maxLength: [10, "The color must be max 10 characters long"]
    },
    weight: {
        type: String,
        required: [true, "The weight's field can't be empty"],
        minLength: [1, "The weight should be at least 1 characters long"]
    },
    image: {
        type: String,
        required: [true, "The image's field can't be empty"],
        match: [/^https?:\/\//, "The image should start with http:// or https://"]
    },
    preferredList : {
        type: [{ type: Schema.Types.ObjectId, ref: "User" }]
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

export default model("Device", deviceSchema);