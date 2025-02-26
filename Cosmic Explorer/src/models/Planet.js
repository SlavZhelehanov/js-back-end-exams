import { Schema, model } from "mongoose";

const planetsSchema = new Schema({
    name: {
        type: String,
        required: [true, "The username's field can't be empty"],
        minLength: [2, "The username should be between 2 and 20 characters long"],
        maxLength: [20, "The username should be between 2 and 20 characters long"]
    },
    age: {
        type: Number,
        required: [true, "The email's field can't be empty"],
        minLength: [10, "The email should be at least 10 characters long"]
    },
    solarSystem: {
        type: String,
        required: [true, "The password's field can't be empty"]
    },
    type: {
        type: String,
        enum: {
            values: ['Inner', 'Outer', 'Dwarf'],
            message: "The Type should be one of the option [Inner, Outer, Dwarf]"
        }
    },
    moons: {
        type: Number,
        required: [true, "The moons's field can't be empty"],
        min: [1, "The Moons should be a positive number"]
    },
    size: {
        type: Number,
        required: [true, "The size's field can't be empty"],
        min: [1, "The Size should be a positive number"]
    },
    rings: {
        type: String,
        enum: {
            values: ['Yes', 'No'],
            message: "The Rings should be one of the option [Yes, No]"
        }
    },
    description: {
        type: String,
        required: [true, "The description's field can't be empty"],
        minLength: [10, "The Description should be between 10 and 100 characters long"],
        maxLength: [100, "The Description should be between 10 and 100 characters long"]
    },
    image: {
        type: String,
        required: [true, "The iamge's field can't be empty"],
        match: [/^https?:\/\//, "The Image should start with http:// or https://"]
    },
    likedList: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

export default model("Planets", planetsSchema);