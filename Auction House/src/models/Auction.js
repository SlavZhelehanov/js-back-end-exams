import { Schema, model } from "mongoose";

const auctionSchema = new Schema({
    title: {
        type: String,
        required: [true, "The title field can't be empty"],
        minLength: [4, "The title should be at least 4 characters long"]
    },
    description: {
        type: String,
        required: [true, "The description's field can't be empty"],
        maxLength: [200, "The description should be maximum 200 characters long"]
    },
    category: {
        type: String,
        required: [true, "The category's field can't be empty"],
        enum: {
            values: ["Vehicles", "Real Estate", "Electronics", "Furniture", "Other"],
            message: "The Category should be select between Vehicles, Real Estate, Electronics, Furniture, Other"
        }
    },
    image: {
        type: String,
        required: [true, "The image's field can't be empty"],
        match: [/^https?:\/\//, "The image should start with http:// or https://"]
    },
    price: {
        type: Number,
        required: [true, "The price's field can't be empty"],
        min: [0, "The price should be a positive number"]
    },
    bidder: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

export default model("Auction", auctionSchema);