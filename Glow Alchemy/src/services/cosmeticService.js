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
    }
};