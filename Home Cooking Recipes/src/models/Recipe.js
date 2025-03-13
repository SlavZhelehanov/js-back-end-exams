import { Schema, model } from "mongoose";

const recipeSchema = new Schema({
    title: {
        type: String,
        required: [true, "The title's field can't be empty"],
        minLength: [2, "The title should be at least 2 characters"]
    },
    ingredients: {
        type: String,
        required: [true, "The ingredients's field can't be empty"],
        minLength: [10, "The ingredients should be a minimum of 10 characters long"],
        maxLength: [200,"The ingredients should be maximum 200 characters long"]
    },
    instructions: {
        type: String,
        required: [true, "The instructions's field can't be empty"],
        minLength: [10, "The instructions should be a minimum of 10 characters long"]
    },
    description: {
        type: String,
        required: [true, "The description's field can't be empty"],
        minLength: [10, "The description should be a minimum of 10 characters long"],
        maxLength: [100,"The description should be maximum 100 characters long"]
    },
    image: {
        type: String,
        required: [true, "The image's field can't be empty"],
        match: [/^https?:\/\//, "The Disaster Image should start with http:// or https://"]
    },
    recommendList : [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

export default model("Recipe", recipeSchema);