import { Schema, model } from "mongoose";

const animalSchema = new Schema({
    name: {
        type: String,
        required: [true, "The name's field can't be empty"],
        minLength: [2, "The Name should be at least 2 characters long"]
    },
    years: {
        type: Number,
        required: [true, "The years field can't be empty"],
        min: [1, "The years should be a number between 1 and  100."],
        max: [100, "The years should be a number between 1 and  100."]
    },
    kind: {
        type: String,
        required: [true, "The kind's field can't be empty"],
        minLength: [3, "The Kind should be at least 3 characters long"]
    },
    image: {
        type: String,
        required: [true, "The iamge's field can't be empty"],
        match: [/^https?:\/\//, "The Image should start with http:// or https://"]
    },
    need: {
        type: String,
        required: [true, "The need's field can't be empty"],
        minLength: [3, "The need should be at least 3 and no longer than 20 characters."],
        maxLength: [20, "The need should be at least 3 and no longer than 20 characters."]
    },
    location: {
        type: String,
        required: [true, "The location's field can't be empty"],
        minLength: [5, "The location should be at least 5 and no longer than 15 characters."],
        maxLength: [15, "The location should be at least 5 and no longer than 15 characters."]
    },
    description: {
        type: String,
        required: [true, "The description's field can't be empty"],
        minLength: [5, "The description should be at least 5 and no longer than 50 characters."],
        maxLength: [50, "The description should be at least 5 and no longer than 50 characters."]
    },
    donations: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

export default model("Animal", animalSchema);