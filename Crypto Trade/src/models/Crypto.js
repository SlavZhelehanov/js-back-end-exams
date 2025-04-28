import { Schema, model } from "mongoose";

const cryptoSchema = new Schema({
    name: {
        type: String,
        required: [true, "The name's field can't be empty"],
        minLength: [2, "The Name should be at least 2 characters"]
    },
    image: {
        type: String,
        required: [true, "The image's field can't be empty"],
        match: [/^https?:\/\//, "The crypto Image should start with http:// or https://"]
    },
    price: {
        type: Number,
        required: [true, "The price's field can't be empty"],
        min: [0, "The Price should be a positive number"]
    },
    description: {
        type: String,
        required: [true, "The description's field can't be empty"],
        minLength: [10, "The Description should be a minimum of 10 characters long"]
    },
    payment: {
        type: String,
        required: [true, "The payment's field can't be empty"],
        enum: {
            values: ["crypto-allet", "credit-card", "debit-card", "paypal"],
            message: "The Payment Method should be select between crypto-allet, credit-card, debit-card, paypal"
        }
    },
    cryptoBuyers: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

export default model("Crypto", cryptoSchema);