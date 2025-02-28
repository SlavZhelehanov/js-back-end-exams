import { Schema, model } from "mongoose";

const disasterSchema = new Schema({
    nameOfTheDisaster: {
        type: String,
        required: [true, "The name's field can't be empty"],
        minLength: [2, "The Name should be at least 2 characters"]
    },
    typeOfDisaster: {
        type: String,
        required: [true, "The type's field can't be empty"],
        enum: {
            values: ["Wildfire", "Flood", "Earthquake", "Hurricane", "Drought", "Tsunami", "Other"],
            message: "The Type should be select between Wildfire, Flood, Earthquake, Hurricane, Drought, Tsunami or Other"
        }
    },
    yearOfTheEvenet: {
        type: Number,
        required: [true, "The year's field can't be empty"],
        min: [0, "The Year should be between 0 and 2024"],
        max: [2024, "The Year should be between 0 and 2024"]
    },
    location: {
        type: String,
        required: [true, "The location's field can't be empty"],
        minLength: [3, "The Location should be at least 3 characters"]
    },
    image: {
        type: String,
        required: [true, "The image's field can't be empty"],
        match: [/^https?:\/\//, "The Disaster Image should start with http:// or https://"]
    },
    description: {
        type: String,
        required: [true, "The description's field can't be empty"],
        minLength: [10, "The Description should be a minimum of 10 characters long"]
    },
    interestedList: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

export default model("Disaster", disasterSchema);