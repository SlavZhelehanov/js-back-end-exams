import Crypto from "../models/Crypto.js";

export default {
    getAllCryptos() {
        return Crypto.find({}, "name image price payment");
    },
    createCrypto(cryptoData) {
        for (const key in cryptoData) cryptoData[key] = cryptoData[key].trim();
        return Crypto.create(cryptoData);
    },
    getOneCrypto(params) {
        return Crypto.findOne(params);
    },
    buyCrypto(cryptoId, newFanId) {
        return Crypto.findByIdAndUpdate(cryptoId, { $push: { cryptoBuyers: newFanId } }, { new: true });
    },
    deleteOneCrypto(_id, owner) {
        return Crypto.findOneAndDelete({ _id, owner });
    },
    updateOneCrypto(_id, owner, crypto, formData) {
        const options = {};

        for (const key in formData) if (formData[key].trim() != crypto[key]) options[key] = formData[key].trim();

        if (0 === Object.keys(options).length) return;
        return Crypto.findOneAndUpdate({ _id, owner }, options, { new: true, runValidators: true });
    }
};