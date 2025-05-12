import { Schema, model } from "mongoose";

const housingSchema = new Schema({
    name: {
        type: String,
        required: [true, "The name's field can't be empty"],
        minLength: [6, "The Name should be at least 6 characters"]
    },
    type: {
        type: String,
        required: [true, "The type's field can't be empty"],
        enum: {
            values: ["Apartment", "Villa", "House"],
            message: "The Type should be select between Apartment, Villa, House"
        }
    },
    year: {
        type: Number,
        required: [true, "The year's field can't be empty"],
        min: [1850, "The Year should be between 1850 and 2021"],
        max: [2021, "The Year should be between 1850 and 2021"]
    },
    city: {
        type: String,
        required: [true, "The city's field can't be empty"],
        minLength: [4, "The city should be at least 4 characters"]
    },
    image: {
        type: String,
        required: [true, "The image's field can't be empty"],
        match: [/^https?:\/\//, "The housing Image should start with http:// or https://"]
    },
    description: {
        type: String,
        required: [true, "The description's field can't be empty"],
        minLength: [60, "The Description should be a minimum of 60 characters long"]
    },
    pieces: {
        type: Number,
        required: [true, "The Available Pieces field can't be empty"],
        min: [0, "The Available Pieces should be between 0 and 10 inclusive"],
        max: [10, "The Available Pieces should be between 0 and 10 inclusive"]
    },
    rentedAhome: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

export default model("Housing", housingSchema);