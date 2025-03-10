import Cosmetic from "../models/Cosmetic.js";

export default {
    getLastTreeAddedCosmetics() {
        return Cosmetic.find({}, "name image skin").sort({ createdAt: -1 }).limit(3);
    },
    getAllCosmetics(filter = null) {
        const search = 0 < filter?.search?.trim().length ? {
            name: { $regex: filter["search"].trim(), $options: "i" }
        } : {};

        return Cosmetic.find(search, "name image skin");
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
    updateOneCosmetic(_id, owner, cosmetic, formData) {
        const options = {};

        for (const key in formData) if (formData[key] != cosmetic[key]) options[key] = formData[key].trim();

        if (0 === Object.keys(options).length) return;
        return Cosmetic.findOneAndUpdate({ _id, owner }, options, { new: true, runValidators: true });
    },
    deleteOneCosmetic(_id, owner) {
        return Cosmetic.findOneAndDelete({ _id, owner });
    }
};