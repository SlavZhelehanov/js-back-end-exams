import Crypto from "../models/Crypto.js";

export default {
    getAllCryptos() {
        return Crypto.find({}, "name image price payment");
    }
};