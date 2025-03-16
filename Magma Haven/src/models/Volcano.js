import { Schema, model } from "mongoose";

const volcanoSchema = new Schema({
    nameOfTheVolcano: {
        type: String,
        required: [true, "The name's field can't be empty"],
        minLength: [2, "The Name should be at least 2 characters"]
    },
    location: {
        type: String,
        required: [true, "The location's field can't be empty"],
        minLength: [3, "The Location should be at least 3 characters"]
    },
    elevation: {
        type: Number,
        required: [true, "The elevation's field can't be empty"],
        min: [0, "The elevation should be minimum 0"]
    },
    lastEruption: {
        type: Number,
        required: [true, "The year's field can't be empty"],
        min: [0, "The Year of Last Eruption should be between 0 and 2024"],
        max: [2024, "The Year of Last Eruption should be between 0 and 2024"]
    },
    image: {
        type: String,
        required: [true, "The image's field can't be empty"],
        match: [/^https?:\/\//, "The volcano Image should start with http:// or https://"]
    },
    typeOfVolcano: {
        type: String,
        required: [true, "The type's field can't be empty"],
        enum: {
            values: ["Supervolcanoes", "Submarine", "Subglacial", "Mud", "Stratovolcanoes", "Shield"],
            message: "The Type should be select between Supervolcanoes, Submarine, Subglacial, Mud, Stratovolcanoes or Shield"
        }
    },
    description: {
        type: String,
        required: [true, "The description's field can't be empty"],
        minLength: [10, "The Description should be a minimum of 10 characters long"]
    },
    voteList: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

export default model("Volcano", volcanoSchema);