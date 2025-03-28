import { Schema, model } from "mongoose";

const creatureSchema = new Schema({
    name: {
        type: String,
        required: [true, "The name field can't be empty"],
        minLength: [2, "The name should be at least 2 characters long"]
    },
    species: {
        type: String,
        required: [true, "The species field can't be empty"],
        minLength: [3, "The species should be at least 3 characters long"]
    },
    skinColor: {
        type: String,
        required: [true, "The skin color's field can't be empty"],
        minLength: [3, "The skin color should be at least 3 characters long"]
    },
    eyeColor: {
        type: String,
        required: [true, "The eye color's field can't be empty"],
        minLength: [3, "The eye color should be at least 3 characters long"]
    },
    image: {
        type: String,
        required: [true, "The image's field can't be empty"],
        match: [/^https?:\/\//, "The image should start with http:// or https://"]
    },
    description: {
        type: String,
        required: [true, "The description's field can't be empty"],
        minLength: [5, "The description is required and should be at least 5 and no longer than 500 characters."],
        maxLength: [500, "The description is required and should be at least 5 and no longer than 500 characters."]
    },
    votes : {
        type: [{ type: Schema.Types.ObjectId, ref: "User" }]
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

export default model("Creature", creatureSchema);