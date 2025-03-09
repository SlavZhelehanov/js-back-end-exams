import Cosmetic from "../models/Cosmetic.js";

export default {
    getLastTreeAddedCosmetics() {
        return Cosmetic.find({}, "name image skin").sort({ createdAt: -1 }).limit(3);
    },
    getAllCosmetics() {
        return Cosmetic.find({}, "name image skin");
    },
    createCosmetic(cosmeticData) {
        for (const key in cosmeticData) cosmeticData[key] = cosmeticData[key].trim();
        return Cosmetic.create(cosmeticData);
    },
    getOneCosmetic(params) {
        return Cosmetic.findOne(params);
    },
    recommendCosmetic(cosmeticId, newFanId) {
        return Cosmetic.findByIdAndUpdate(cosmeticId, { $push: { recommendList: newFanId } }, { new: true });
    },
    updateOneCosmetic(_id, owner, options) {
        return Cosmetic.findOneAndUpdate({ _id, owner }, options, { new: true, runValidators: true });
    }
};