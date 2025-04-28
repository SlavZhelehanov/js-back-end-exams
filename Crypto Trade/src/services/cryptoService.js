import Crypto from "../models/Crypto.js";

export default {
    getAllCryptos() {
        return Crypto.find({}, "name image price payment");
    },
    createCrypto(cryptoData) {
        for (const key in cryptoData) cryptoData[key] = cryptoData[key].trim();
        return Crypto.create(cryptoData);
    }
};